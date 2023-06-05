import { Attachment, AttachmentGroup } from '../api/models';
import {
    BehaviorSubject,
    Observable,
    Subject,
    combineLatest,
    distinctUntilChanged,
    filter,
    map,
    mergeMap,
    of,
    zip
} from 'rxjs';

import { DataService } from 'src/app/api/data.service';
import { Facility } from '../api/models';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class FacilityInfoPageService {
    private _pictures$ = new BehaviorSubject<Attachment[]>([]);
    private _documents$ = new BehaviorSubject<AttachmentGroup[]>([]);
    private _aboutPage$ = new BehaviorSubject<string>('');
    private _diagram$ = new BehaviorSubject<string>('');
    private _facility$ = new BehaviorSubject<Partial<Facility>>({})
    private _title$ = new BehaviorSubject<string>('');

    constructor(private dataService: DataService) {
    }

    aboutPages:{[key:number]:string} = {
        1: "B1-PET.about.html",
        2: "B3-PET.about.html",
        3: "CC-CCE-2J.about.html",
        4: "CC-CCE-12E.about.html",
        5: "CC-CCE-NCI.about.html",
        6: "CC-DLM-LAB.about.html",
        7: "CC-NMD_RADIO.about.html",
        8: "I-IVAU.about.html",
        9: "P-IVAU.about.html",
        10: "NCI-1B42.about.html",
        11: "NCI_3W_TIL_LAB.about.html",
        12: "NCI-Trailer1.about.html",
        13: "NCI-Trailer2.about.html",
        16: "CC-CCE-3T.about.html",
        17: "I-IVAU_Ext.about.html",
        18: "NIAID_Viral.about.html",
        19: "NCY_Hyperpolarized.about.html",
        20: "NIAID_29B_Bio_Facility.about.html"
    }


    diagrams:{[key:number]:string} = {
        1: "CC_PET_Radiopharmacy.pdf",
        2: "CC_PET_B3_Radiochemistry.pdf",
        3: "CCE_2J_Cell_Therapy_Lab.pdf",
        4: "CC_CCE_12E_Cell_Therapy_Lab.pdf",
        5: "CC_CCE_East_Terrace_Modular.pdf",
        6:"CC_DLM_Sterility_Lab.pdf",
        8:"CC_PHARMACY_I-IVAU.pdf",
        9:"P-IVAU_Diagram.pdf",
        10:"NCI_SB_1B42.pdf",
        11:"NCI_SB_TIL_Modular.pdf",
        12:"NCI_Trailer1-10A.pdf",
        13:"NCI_Trailer1-10B.pdf",
        19:"HPP_Diagram.pdf"
    }
      
    Load(facilityId: number) {

        this.dataService.facilityPictures(facilityId).subscribe((pictures: Attachment[]) => {
            const picturesWithUrls = pictures.map(p => ({ ...p, url: `${environment.attachmentRootUrl}/${p.storedFileName}` }));
            this._pictures$.next(picturesWithUrls);
        });

        this.dataService.facilityDocuments(facilityId).subscribe((documents: AttachmentGroup[]) => {
            const docs = documents.map(d => ({
                ...d,
                attachments: d.attachments.map(a => ({ 
                    ...a, 
                    url: `${environment.attachmentRootUrl}/${a.storedFileName}` }))
            }));
            this._documents$.next(docs.filter(d=>d.description !== 'Facility Digram')); 
        });

        this.dataService.facilityById(facilityId).subscribe(facility=>{
            this._facility$.next(facility);
            //this._title$.next(facility.facilityFullName || '');
        });

        const aboutPage = this.aboutPages[facilityId] ? 'about/'+this.aboutPages[facilityId] : '';
        const diagram = this.diagrams[facilityId] ? 'assets/diagrams/'+this.diagrams[facilityId] : '';
        this._aboutPage$.next(aboutPage);
        this._diagram$.next(diagram);
    }

    public get pictures$() {
        return this._pictures$ as Observable<Attachment[]>;
    }

    public get documents$() {
        return this._documents$ as Observable<AttachmentGroup[]>;
    }

    public get aboutPage$() {
        return this._aboutPage$ as Observable<string>;
    }
    
    public get diagram$() {
        return this._diagram$ as Observable<string>;
    }
    
    public get title$() {
        return this._facility$.pipe(map(x=>x.facilityFullName)) as Observable<string>;
    }
    
    public get facilitySection$() {
        return this._facility$.pipe(map(x=>x.facilitySection)) as Observable<string>;
    }
}