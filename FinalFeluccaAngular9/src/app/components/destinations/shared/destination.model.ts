import { Boatman } from '../../_person/boat-man/shared/boatman.model';

export class Destination {
    id: number;
    name: string;
    info: string;
    longitude: number;
    latitude: number;
    adminID: number;
    picture: number;
    cityID: number;
    person: Boatman
}
