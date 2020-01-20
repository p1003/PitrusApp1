export class Filter {
  name: string = null;
  starsMin: number = null;
  starsMax: number = null;
  etcsMin: number = null;
  etcsMax: number = null;
  placesMin: number = null;
  placesMax: number = null;
  semesterMin: number = null;
  semesterMax: number = null;
  form: string = null;
  description: string = null;

  constructor(fastInit?: Partial<Filter>) {
    Object.assign(this, fastInit);
  }
}
