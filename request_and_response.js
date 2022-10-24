{
    input:
    {
        min: 'xsd:string',
        document: 'xsd:string',
        userRol: 'xsd:string',
        userProfile: 'xsd:string',
        userName: 'xsd:string',
        userCac: 'xsd:string',
        coordiatorRol: 'xsd:string',
        isQuote: 'xsd:boolean',
        isDomicile: 'xsd:boolean',
        uuid: 'xsd:string',
        materialCode: 'xsd:string',
        contractId: 'xsd:string',
        planType: 'xsd:string',
        cfmValue: 'xsd:string',
        monthsLastReposition: 'xsd:string',
        tmCode: 'xsd:string',
        CurrentPackageList: {
            'CurrentPackage[]': { 
                cfmPackage: 'xsd:string',
                des: 'xsd:string',
                description: 'xsd:string',
                snCode: 'xsd:string',
                spCode: 'xsd:string',
                tmCode: 'xsd:string',
                targetNSAlias: 'tns',
                targetNamespace: 'http://www.amx.com/co/schema/mobile/aplicationIntegration/RepositionValidator/v1.0' 
            },
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.amx.com/co/schema/mobile/aplicationIntegration/RepositionValidator/v1.0'
        },
        PocIndicatorList: {
            'productCodeActivePlan[]': 'xsd:int',
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.amx.com/co/schema/mobile/aplicationIntegration/RepositionValidator/v1.0'
        },
        isImeiStolen: 'xsd:boolean',
        documentType: 'xsd:int',
        regionLyne: 'xsd:int',
        isVip: 'xsd:boolean',
        antiqueLine: 'xsd:string',
        autorizeCentralRisk: 'xsd:boolean',
        targetNSAlias: 'tns',
        targetNamespace: 'http://www.amx.com/co/schema/mobile/aplicationIntegration/RepositionValidator/v1.0'
    },
    output: {
        code: 'xsd:string',
        description: 'xsd:string',
        note: 'xsd:string',
        globalResult: 'xsd:boolean',
        ValidateReserveResult: {
            paymentBehaviorId: 'xsd:int',
            paymentBehavior: 'xsd:string',
            creditScore: 'xsd:string',
            financedValue: 'xsd:int',
            isVip: 'xsd:boolean',
            contractState: 'xsd:string',
            isPostpaid: 'xsd:boolean',
            moraStatus: 'xsd:string',
            isStolenIccid: 'xsd:boolean',
            isStolenImei: 'xsd:boolean',
            iccid: 'xsd:string',
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.amx.com/co/schema/mobile/aplicationIntegration/RepositionValidator/v1.0'
        },
        GetPriceResult: {
            isApplyIva: 'xsd:boolean',
            equipmentReference: 'xsd:string',
            stagePrice: 'xsd:string',
            priceWithIva: 'xsd:decimal',
            priceWithoutIva: 'xsd:decimal',
            finance: 'xsd:boolean',
            financeQoutes: 'xsd:string',
            'QuotesEquipment[]': { 
                defferValue: 'xsd:decimal',
                financedIva: 'xsd:unsignedByte',
                priceFinancedWithoutIva: 'xsd:decimal',
                priceFinancedWithIva: 'xsd:decimal',
                initialQuoteWithoutIva: 'xsd:decimal',
                initialQuoteWithIva: 'xsd:decimal',
                percentInitialQuote: 'xsd:decimal',
                percent: 'xsd:decimal',
                quoteNumber: 'xsd:unsignedByte',
                quoteValue: 'xsd:decimal',
                sourcePercentInitialQuote: 'xsd:string',
                iva: 'xsd:decimal',
                targetNSAlias: 'tns',
                targetNamespace: 'http://www.amx.com/co/schema/mobile/aplicationIntegration/RepositionValidator/v1.0' 
            },
            targetNSAlias: 'tns',
            targetNamespace: 'http://www.amx.com/co/schema/mobile/aplicationIntegration/RepositionValidator/v1.0'
        },
        targetNSAlias: 'tns',
        targetNamespace: 'http://www.amx.com/co/schema/mobile/aplicationIntegration/RepositionValidator/v1.0'
    }
}