export class Prize{

    id: number;
    organization: string;
    name: string;
    description: string;
    performerPrizes:Array<PerformerPrizes>;



  public constructor(id?: number, organization?:string, name?: string, description?: string, performerPrizes?:Array<PerformerPrizes>){
    this.id = id;
    this.organization =organization
    this.name = name;
    this.description = description;
    this.performerPrizes=performerPrizes;

  }

}
export class PerformerPrizes{

    id:number;
    premiationDate:string;
  public constructor(id?: number,  premiationDate?:string){
      this.id = id;
      this.premiationDate=premiationDate;
  }
}
