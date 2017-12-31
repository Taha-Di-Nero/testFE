export enum ChartTypes {
  Bar,
  Line
}

export class Sensor {
  id: number;
  name: string;
  color: string;
}

export class ChartDefinition {
  type: ChartTypes = ChartTypes.Bar;
  sensors = new Array<Sensor>();
}

