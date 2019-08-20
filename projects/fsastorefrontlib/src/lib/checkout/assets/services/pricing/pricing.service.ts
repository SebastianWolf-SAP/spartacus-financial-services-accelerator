import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PriceAttributeGroup, PricingData } from '../../models/pricing.interface';


@Injectable()
export class PricingService {

    pricingSource$ = new BehaviorSubject<PricingData>({});

    buildPricingData(formData: { [name: string]: Object }) {
        const pricingAttributesData: PricingData = {
            priceAttributeGroups: []
        };
        Object.keys(formData).forEach(groupName => {
            const priceAttributeGroup: PriceAttributeGroup = {
                priceAttributes: [],
            };
            priceAttributeGroup.name = groupName;
            Object.keys(formData[groupName]).forEach(inputName => {
                priceAttributeGroup.priceAttributes.push({ 'key': inputName, 'value': formData[groupName][inputName] });
            });
            pricingAttributesData.priceAttributeGroups.push(priceAttributeGroup);
        });
        this.pricingSource$.next(pricingAttributesData);
    }

    getPricingAttributes(): Observable<PricingData> {
        return this.pricingSource$.asObservable();
    }

}
