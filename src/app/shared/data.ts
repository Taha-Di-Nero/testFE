export enum ChartTypes {
  Bar,
  Line
}

export class Sensor {
  readonly id: number;
  readonly name: string;
  color: string;
}

export class ChartDefinition {
  type: ChartTypes = ChartTypes.Bar;
  sensors = new Array<Sensor>();
}

