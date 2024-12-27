export interface BenefitProps {
  name: string
  value: number
  description?: string
  conditions?: string[]
}

export class Benefit {
  private props: BenefitProps

  private constructor(props: BenefitProps) {
    if (this.props.value <= 0) {
      throw new Error('O valor do beneficio não pode ser negativo')
    }
    this.props = props
  }

  get name() {
    return this.props.name
  }

  get value() {
    return this.props.value
  }

  get description() {
    return this.props.description
  }

  get conditions() {
    return this.props.conditions
  }

  static create(props: BenefitProps) {
    return new Benefit(props)
  }
}
