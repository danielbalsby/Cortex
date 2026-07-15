import type {
  AssessmentSuggestion,
  ClinicalField,
  ClinicalOutputType,
  ClinicalPathway,
  RuleCondition
} from "@/clinical/types";

export interface ValidationIssue {
  code: string;
  message: string;
  path?: string;
  value?: unknown;
}

export interface PathwayValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface PathwayValidationOptions {
  availableGeneratorIds?: Iterable<string>;
}

export type AnswerValidationResult =
  | { accepted: true; value: string | string[] }
  | { accepted: false; issue: ValidationIssue };

const SUPPORTED_FIELD_TYPES = new Set(["single-choice", "multi-choice", "short-text"]);
const SUPPORTED_OPERATORS = new Set(["equals", "includes", "truthy"]);
const SUPPORTED_OUTPUT_TYPES = new Set<ClinicalOutputType>([
  "journal",
  "physiotherapy-referral",
  "xray-referral",
  "orthopedic-referral"
]);

function isNonEmptyId(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function addIssue(
  issues: ValidationIssue[],
  code: string,
  message: string,
  path?: string,
  value?: unknown
) {
  issues.push({
    code,
    message,
    ...(path ? { path } : {}),
    ...(value !== undefined ? { value } : {})
  });
}

function validateIds(
  values: Array<{ id: unknown; path: string }>,
  kind: string,
  issues: ValidationIssue[]
) {
  const seen = new Set<string>();

  for (const { id, path } of values) {
    if (!isNonEmptyId(id)) {
      addIssue(issues, `${kind}.empty-id`, `${kind} ID must be non-empty.`, path, id);
      continue;
    }
    if (seen.has(id)) {
      addIssue(issues, `${kind}.duplicate-id`, `Duplicate ${kind} ID "${id}".`, path, id);
    } else {
      seen.add(id);
    }
  }
}

function validateFieldContract(
  field: ClinicalField,
  path: string,
  issues: ValidationIssue[]
) {
  const fieldType = field.type as string;
  const options = Array.isArray(field.options) ? field.options : [];

  if (!SUPPORTED_FIELD_TYPES.has(fieldType)) {
    addIssue(
      issues,
      "field.unsupported-type",
      `Field "${field.id}" uses unsupported type "${fieldType}".`,
      `${path}.type`,
      field.type
    );
    return;
  }

  if (fieldType === "short-text" && field.options !== undefined) {
    addIssue(
      issues,
      "field.incompatible-options",
      `Short-text field "${field.id}" must not declare options.`,
      `${path}.options`
    );
  }

  if (fieldType !== "short-text" && options.length === 0) {
    addIssue(
      issues,
      "field.missing-options",
      `Choice field "${field.id}" must declare at least one option.`,
      `${path}.options`
    );
  }

  const seenOptions = new Set<string>();
  for (const [optionIndex, option] of options.entries()) {
    const optionPath = `${path}.options[${optionIndex}].value`;
    if (!isNonEmptyId(option.value)) {
      addIssue(
        issues,
        "field.empty-option-value",
        `Field "${field.id}" has an option with an empty value.`,
        optionPath,
        option.value
      );
      continue;
    }
    if (seenOptions.has(option.value)) {
      addIssue(
        issues,
        "field.duplicate-option-value",
        `Field "${field.id}" has duplicate option value "${option.value}".`,
        optionPath,
        option.value
      );
    } else {
      seenOptions.add(option.value);
    }
  }

  const runtimeField = field as ClinicalField & { defaultValue?: unknown };
  if (!Object.prototype.hasOwnProperty.call(runtimeField, "defaultValue")) return;

  const defaultValue = runtimeField.defaultValue;
  if (defaultValue === undefined) return;

  let contractValid = true;
  let clinicallyMeaningful = false;

  if (fieldType === "multi-choice") {
    if (!Array.isArray(defaultValue) || !defaultValue.every((item) => typeof item === "string")) {
      contractValid = false;
    } else {
      clinicallyMeaningful = defaultValue.length > 0;
      if (
        new Set(defaultValue).size !== defaultValue.length ||
        defaultValue.some((item) => !seenOptions.has(item))
      ) {
        contractValid = false;
      }
    }
  } else if (typeof defaultValue !== "string") {
    contractValid = false;
  } else {
    clinicallyMeaningful = defaultValue.length > 0;
    if (fieldType === "single-choice" && defaultValue && !seenOptions.has(defaultValue)) {
      contractValid = false;
    }
  }

  if (!contractValid) {
    addIssue(
      issues,
      "field.invalid-default",
      `Default for field "${field.id}" does not match its field contract.`,
      `${path}.defaultValue`,
      defaultValue
    );
  }
  if (clinicallyMeaningful) {
    addIssue(
      issues,
      "field.clinical-default",
      `Field "${field.id}" must not declare a clinically meaningful default.`,
      `${path}.defaultValue`,
      defaultValue
    );
  }
}

function validateCondition(
  condition: RuleCondition,
  path: string,
  fields: Map<string, ClinicalField>,
  issues: ValidationIssue[]
) {
  const operator = condition.operator as string;
  const field = fields.get(condition.fieldId);

  if (!field) {
    addIssue(
      issues,
      "condition.unknown-field",
      `Condition references unknown field "${condition.fieldId}".`,
      `${path}.fieldId`,
      condition.fieldId
    );
  }

  if (!SUPPORTED_OPERATORS.has(operator)) {
    addIssue(
      issues,
      "condition.unsupported-operator",
      `Condition uses unsupported operator "${operator}".`,
      `${path}.operator`,
      condition.operator
    );
    return;
  }

  if (operator === "truthy") {
    if (condition.value !== undefined) {
      addIssue(
        issues,
        "condition.unexpected-value",
        "The truthy operator must not declare a comparison value.",
        `${path}.value`,
        condition.value
      );
    }
    return;
  }

  if (!isNonEmptyId(condition.value)) {
    addIssue(
      issues,
      "condition.missing-value",
      `Operator "${operator}" requires an explicit non-empty value.`,
      `${path}.value`,
      condition.value
    );
    return;
  }

  if (!field) return;

  if (operator === "includes" && field.type !== "multi-choice") {
    addIssue(
      issues,
      "condition.incompatible-operator",
      `Operator "includes" requires a multi-choice field, but "${field.id}" is ${field.type}.`,
      `${path}.operator`,
      operator
    );
    return;
  }

  if (operator === "equals" && field.type === "multi-choice") {
    addIssue(
      issues,
      "condition.incompatible-operator",
      `Operator "equals" is not valid for multi-choice field "${field.id}"; use "includes".`,
      `${path}.operator`,
      operator
    );
    return;
  }

  if (
    (field.type === "single-choice" || field.type === "multi-choice") &&
    !field.options?.some((option) => option.value === condition.value)
  ) {
    addIssue(
      issues,
      "condition.invalid-option-value",
      `Condition value "${condition.value}" is not an option for field "${field.id}".`,
      `${path}.value`,
      condition.value
    );
  }
}

function conditionKey(condition: RuleCondition) {
  return `${condition.fieldId}\u0000${condition.operator}\u0000${condition.value ?? ""}`;
}

function duplicateConditionKeys(conditions: readonly RuleCondition[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const condition of conditions) {
    const key = conditionKey(condition);
    if (seen.has(key)) duplicates.add(key);
    seen.add(key);
  }
  return duplicates;
}

function validateSuggestionDisplayPolicy(
  suggestion: AssessmentSuggestion,
  path: string,
  issues: ValidationIssue[]
) {
  const runtimeSuggestion = suggestion as AssessmentSuggestion & {
    displayPolicy?: AssessmentSuggestion["displayPolicy"];
  };
  const policy = runtimeSuggestion.displayPolicy;
  const supportingConditionCount = suggestion.conditions.length;

  if (!policy || typeof policy !== "object") {
    addIssue(
      issues,
      "suggestion.missing-display-policy",
      `Assessment suggestion "${suggestion.value}" must declare a display policy.`,
      `${path}.displayPolicy`
    );
    return;
  }

  if (supportingConditionCount === 0) {
    addIssue(
      issues,
      "suggestion.missing-supporting-conditions",
      `Assessment suggestion "${suggestion.value}" must declare supporting conditions.`,
      `${path}.conditions`
    );
  }

  const minimum = policy.minimumMatchedConditions;
  const hasMinimum = minimum !== undefined;
  const requiresAll = policy.requireAll === true;

  if (policy.requireAll !== undefined && typeof policy.requireAll !== "boolean") {
    addIssue(
      issues,
      "suggestion.policy.invalid-require-all",
      `Display policy for "${suggestion.value}" has an invalid requireAll value.`,
      `${path}.displayPolicy.requireAll`,
      policy.requireAll
    );
  }

  if (!requiresAll && !hasMinimum) {
    addIssue(
      issues,
      "suggestion.policy.missing-threshold",
      `Display policy for "${suggestion.value}" must declare requireAll or minimumMatchedConditions.`,
      `${path}.displayPolicy`
    );
  }

  if (hasMinimum && (!Number.isInteger(minimum) || minimum < 1)) {
    addIssue(
      issues,
      "suggestion.policy.invalid-minimum",
      `minimumMatchedConditions for "${suggestion.value}" must be a positive integer.`,
      `${path}.displayPolicy.minimumMatchedConditions`,
      minimum
    );
  } else if (hasMinimum && minimum > supportingConditionCount) {
    addIssue(
      issues,
      "suggestion.policy.minimum-exceeds-support",
      `minimumMatchedConditions for "${suggestion.value}" exceeds its supporting-condition count.`,
      `${path}.displayPolicy.minimumMatchedConditions`,
      minimum
    );
  }

  if (requiresAll && hasMinimum) {
    addIssue(
      issues,
      minimum === supportingConditionCount
        ? "suggestion.policy.duplicate-threshold"
        : "suggestion.policy.conflicting-threshold",
      minimum === supportingConditionCount
        ? `Display policy for "${suggestion.value}" declares the same threshold twice.`
        : `requireAll conflicts with minimumMatchedConditions for "${suggestion.value}".`,
      `${path}.displayPolicy`
    );
  }

  const policyLists = [
    ["requiredConditions", policy.requiredConditions ?? []],
    ["suppressWhen", policy.suppressWhen ?? []]
  ] as const;
  for (const [name, conditions] of policyLists) {
    if (duplicateConditionKeys(conditions).size > 0) {
      addIssue(
        issues,
        "suggestion.policy.duplicate-condition",
        `Display policy for "${suggestion.value}" contains a duplicate ${name} condition.`,
        `${path}.displayPolicy.${name}`
      );
    }
  }

  const requiredKeys = new Set((policy.requiredConditions ?? []).map(conditionKey));
  const suppressingKeys = new Set((policy.suppressWhen ?? []).map(conditionKey));
  if ([...requiredKeys].some((key) => suppressingKeys.has(key))) {
    addIssue(
      issues,
      "suggestion.policy.contradictory-condition",
      `Display policy for "${suggestion.value}" both requires and suppresses the same condition.`,
      `${path}.displayPolicy`
    );
  }

  const allSupportRequired =
    requiresAll ||
    (hasMinimum &&
      Number.isInteger(minimum) &&
      minimum === supportingConditionCount);
  if (
    allSupportRequired &&
    suggestion.conditions.some((condition) => suppressingKeys.has(conditionKey(condition)))
  ) {
    addIssue(
      issues,
      "suggestion.policy.impossible-display",
      `Display policy for "${suggestion.value}" suppresses a condition required for display.`,
      `${path}.displayPolicy`
    );
  }
}

function detectVisibilityCycle(
  pathway: ClinicalPathway,
  fields: Map<string, ClinicalField>
): string[] | undefined {
  const dependencies = new Map<string, string[]>();
  const ensureNode = (node: string) => {
    if (!dependencies.has(node)) dependencies.set(node, []);
  };
  const addDependency = (node: string, dependency: string) => {
    ensureNode(node);
    ensureNode(dependency);
    dependencies.get(node)!.push(dependency);
  };

  for (const section of pathway.sections) {
    if (!isNonEmptyId(section.id)) continue;
    const sectionNode = `section:${section.id}`;
    ensureNode(sectionNode);

    for (const condition of section.visibleWhen ?? []) {
      if (fields.has(condition.fieldId)) {
        addDependency(sectionNode, `field:${condition.fieldId}`);
      }
    }

    for (const field of section.fields) {
      if (!isNonEmptyId(field.id)) continue;
      const fieldNode = `field:${field.id}`;
      addDependency(fieldNode, sectionNode);
      for (const condition of field.visibleWhen ?? []) {
        if (fields.has(condition.fieldId)) {
          addDependency(fieldNode, `field:${condition.fieldId}`);
        }
      }
    }
  }

  const state = new Map<string, "visiting" | "visited">();
  const stack: string[] = [];

  function visit(node: string): string[] | undefined {
    if (state.get(node) === "visited") return undefined;
    if (state.get(node) === "visiting") {
      const start = stack.indexOf(node);
      return [...stack.slice(start), node];
    }

    state.set(node, "visiting");
    stack.push(node);
    for (const dependency of dependencies.get(node) ?? []) {
      const cycle = visit(dependency);
      if (cycle) return cycle;
    }
    stack.pop();
    state.set(node, "visited");
    return undefined;
  }

  for (const node of dependencies.keys()) {
    const cycle = visit(node);
    if (cycle) return cycle;
  }
  return undefined;
}

export function validateClinicalPathway(
  pathway: ClinicalPathway,
  options: PathwayValidationOptions = {}
): PathwayValidationResult {
  const issues: ValidationIssue[] = [];
  const availableGeneratorIds = options.availableGeneratorIds
    ? new Set(options.availableGeneratorIds)
    : undefined;

  if (!isNonEmptyId(pathway.id)) {
    addIssue(issues, "pathway.empty-id", "Pathway ID must be non-empty.", "id", pathway.id);
  }

  validateIds(
    pathway.sections.map((section, index) => ({ id: section.id, path: `sections[${index}].id` })),
    "section",
    issues
  );
  validateIds(
    pathway.sections.flatMap((section, sectionIndex) =>
      section.fields.map((field, fieldIndex) => ({
        id: field.id,
        path: `sections[${sectionIndex}].fields[${fieldIndex}].id`
      }))
    ),
    "field",
    issues
  );
  validateIds(
    pathway.rules.map((rule, index) => ({ id: rule.id, path: `rules[${index}].id` })),
    "rule",
    issues
  );
  validateIds(
    pathway.outputs.map((output, index) => ({ id: output.id, path: `outputs[${index}].id` })),
    "output",
    issues
  );

  const fields = new Map<string, ClinicalField>();
  for (const [sectionIndex, section] of pathway.sections.entries()) {
    for (const [fieldIndex, field] of section.fields.entries()) {
      const path = `sections[${sectionIndex}].fields[${fieldIndex}]`;
      validateFieldContract(field, path, issues);
      if (isNonEmptyId(field.id) && !fields.has(field.id)) fields.set(field.id, field);
    }
  }

  const suggestionValues = new Set<string>();
  for (const [index, suggestion] of (pathway.assessmentSuggestions ?? []).entries()) {
    const suggestionPath = `assessmentSuggestions[${index}]`;
    const path = `${suggestionPath}.value`;
    if (!isNonEmptyId(suggestion.value)) {
      addIssue(
        issues,
        "suggestion.empty-value",
        "Assessment suggestion value must be non-empty.",
        path,
        suggestion.value
      );
    } else if (suggestionValues.has(suggestion.value)) {
      addIssue(
        issues,
        "suggestion.duplicate-value",
        `Duplicate assessment suggestion value "${suggestion.value}".`,
        path,
        suggestion.value
      );
    } else {
      suggestionValues.add(suggestion.value);
    }
    validateSuggestionDisplayPolicy(suggestion, suggestionPath, issues);
  }

  for (const [sectionIndex, section] of pathway.sections.entries()) {
    for (const [conditionIndex, condition] of (section.visibleWhen ?? []).entries()) {
      validateCondition(
        condition,
        `sections[${sectionIndex}].visibleWhen[${conditionIndex}]`,
        fields,
        issues
      );
    }
    for (const [fieldIndex, field] of section.fields.entries()) {
      for (const [conditionIndex, condition] of (field.visibleWhen ?? []).entries()) {
        validateCondition(
          condition,
          `sections[${sectionIndex}].fields[${fieldIndex}].visibleWhen[${conditionIndex}]`,
          fields,
          issues
        );
      }
    }
  }

  for (const [ruleIndex, rule] of pathway.rules.entries()) {
    for (const [conditionIndex, condition] of rule.all.entries()) {
      validateCondition(
        condition,
        `rules[${ruleIndex}].all[${conditionIndex}]`,
        fields,
        issues
      );
    }
  }

  for (const [suggestionIndex, suggestion] of (pathway.assessmentSuggestions ?? []).entries()) {
    for (const [conditionIndex, condition] of suggestion.conditions.entries()) {
      validateCondition(
        condition,
        `assessmentSuggestions[${suggestionIndex}].conditions[${conditionIndex}]`,
        fields,
        issues
      );
    }
    for (const [conditionIndex, condition] of (
      suggestion.displayPolicy?.requiredConditions ?? []
    ).entries()) {
      validateCondition(
        condition,
        `assessmentSuggestions[${suggestionIndex}].displayPolicy.requiredConditions[${conditionIndex}]`,
        fields,
        issues
      );
    }
    for (const [conditionIndex, condition] of (
      suggestion.displayPolicy?.suppressWhen ?? []
    ).entries()) {
      validateCondition(
        condition,
        `assessmentSuggestions[${suggestionIndex}].displayPolicy.suppressWhen[${conditionIndex}]`,
        fields,
        issues
      );
    }
  }

  for (const [outputIndex, output] of pathway.outputs.entries()) {
    const outputPath = `outputs[${outputIndex}]`;
    if (!SUPPORTED_OUTPUT_TYPES.has(output.type)) {
      addIssue(
        issues,
        "output.unsupported-type",
        `Output "${output.id}" uses unsupported type "${output.type}".`,
        `${outputPath}.type`,
        output.type
      );
    }
    if (!isNonEmptyId(output.generatorId)) {
      addIssue(
        issues,
        "output.missing-generator-id",
        `Output "${output.id}" must declare a non-empty generator ID.`,
        `${outputPath}.generatorId`,
        output.generatorId
      );
    } else if (availableGeneratorIds && !availableGeneratorIds.has(output.generatorId)) {
      addIssue(
        issues,
        "output.unknown-generator-id",
        `Output "${output.id}" references unregistered generator "${output.generatorId}".`,
        `${outputPath}.generatorId`,
        output.generatorId
      );
    }
    if (output.alwaysActive && output.activeWhen?.length) {
      addIssue(
        issues,
        "output.contradictory-activation",
        `Output "${output.id}" cannot be always active and conditionally active.`,
        outputPath
      );
    }
    if (!output.alwaysActive && !output.activeWhen?.length) {
      addIssue(
        issues,
        "output.missing-activation",
        `Output "${output.id}" must be always active or declare an activation condition.`,
        outputPath
      );
    }
    for (const [conditionIndex, condition] of (output.activeWhen ?? []).entries()) {
      validateCondition(
        condition,
        `${outputPath}.activeWhen[${conditionIndex}]`,
        fields,
        issues
      );
    }
  }

  const cycle = detectVisibilityCycle(pathway, fields);
  if (cycle) {
    addIssue(
      issues,
      "visibility.circular-dependency",
      `Visibility dependencies contain a cycle: ${cycle.join(" -> ")}.`,
      "visibility"
    );
  }

  return { valid: issues.length === 0, issues };
}

export function validateAnswerUpdate(
  pathway: ClinicalPathway,
  fieldId: string,
  value: unknown
): AnswerValidationResult {
  const field = pathway.sections
    .flatMap((section) => section.fields)
    .find((item) => item.id === fieldId);
  const reject = (code: string, reason: string): AnswerValidationResult => ({
    accepted: false,
    issue: {
      code,
      message: `Rejected answer for field "${fieldId}": ${reason}`,
      path: fieldId,
      value
    }
  });

  if (!field) return reject("answer.unknown-field", "the field does not exist in the pathway.");

  if (field.type === "short-text") {
    return typeof value === "string"
      ? { accepted: true, value }
      : reject("answer.invalid-type", "short-text answers must be strings.");
  }

  if (field.type === "single-choice") {
    if (typeof value !== "string") {
      return reject("answer.invalid-type", "single-choice answers must be strings.");
    }
    if (value && !field.options?.some((option) => option.value === value)) {
      return reject("answer.invalid-option", `"${value}" is not a valid option.`);
    }
    return { accepted: true, value };
  }

  if (field.type === "multi-choice") {
    if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
      return reject("answer.invalid-type", "multi-choice answers must be arrays of strings.");
    }
    if (new Set(value).size !== value.length) {
      return reject("answer.duplicate-option", "duplicate multi-choice values are not allowed.");
    }
    const invalidOption = value.find(
      (selected) => !field.options?.some((option) => option.value === selected)
    );
    if (invalidOption !== undefined) {
      return reject("answer.invalid-option", `"${invalidOption}" is not a valid option.`);
    }
    return { accepted: true, value: [...value] };
  }

  return reject("answer.invalid-field-contract", `field type "${field.type}" is unsupported.`);
}
