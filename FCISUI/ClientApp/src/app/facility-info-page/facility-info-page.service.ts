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
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class FacilityInfoPageService {
    private _pictures$ = new BehaviorSubject<Attachment[]>([]);
    private _documents$ = new BehaviorSubject<AttachmentGroup[]>([]);

    constructor(private dataService: DataService) {
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
            this._documents$.next(docs);
        });
    }

    public get pictures$() {
        return this._pictures$ as Observable<Attachment[]>;
    }

    public get documents$() {
        return this._documents$ as Observable<AttachmentGroup[]>;
    }
}