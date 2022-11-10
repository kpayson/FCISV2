import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
class LegacyPageImportService {
    constructor(baseLegacyUrl:string){}

    private transform(html:string):string {
        return "";
    }

    public fetch(legacyPage:string):string {
        return "";
    }
 }