interface ValidationRules {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  /**
   * The minimum number of people contributing to a project.
   */
  minValue?: number;
  /**
   * The maximum number of people contributing to a project.
   */
  maxValue?: number;
}

export { ValidationRules };
