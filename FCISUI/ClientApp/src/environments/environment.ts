// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  siteRootUrl: 'https://localhost:44420',
  apiRootUrl: 'https://localhost:44420/api',
  attachmentRootUrl: 'https://dtrdata.orf.od.nih.gov/FCISPortal/attachmentsGSS',

  facilityReportsBaseUrl: 'https://orfd-cogen.ors.nih.gov/Facility_Reports',


  dbWebId: 'D0L8A_6d2dm0SBrg5RJa_Z7QOqMnT3pl40GxHekWf2e50gT1JGLUNPR0VOQUZcREFUQUJBU0Ux',
  afServer: 'https://orf-cogenaf.ors.nih.gov',
  baseServer: 'https://orfd-cogen.ors.nih.gov',
  piServer: 'ORF-COGENAF',
  baseHref: '/cup',
  piWebApi: 'https://orf-cogenaf.ors.nih.gov/piwebapi',
  piWebApiCredentialMode: 'include',
  oidcIssuer: 'https://stsstg.nih.gov',
  oidcClientId: '556a5a98-f1cd-4b98-aade-19f8bbbee22f',
  oidcDummySecret:'c6df1e86-4b9e-4b3d-8008-300c3802fc4b',
  redirectUri:'https://localhost:44420'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
