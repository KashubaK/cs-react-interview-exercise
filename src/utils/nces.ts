export interface NCESSchoolFeatureAttributes {
  NCESSCH?: string;
  LEAID?: string;
  NAME?: string;
  OPSTFIPS?: string;
  STREET?: string;
  CITY?: string;
  STATE?: string;
  ZIP?: string;
  STFIP?: string;
  CNTY?: string;
  NMCNTY?: string;
  LOCALE?: string;
  LAT?: number;
  LON?: number;
}

export interface NCESSchoolFeature {
  attributes?: NCESSchoolFeatureAttributes;
  geometry?: {
    x: number;
    y: number;
  };
}

export interface NCESSchoolDetailFeatureAttributes {
  AE: null;
  AM: number;
  AMALF: number;
  AMALM: number;
  AS: number;
  ASALF: number;
  ASALM: number;
  BL: number;
  BLALF: number;
  BLALM: number;
  CHARTER_TEXT: string;
  FRELCH: number;
  FTE: number;
  G01: number;
  G02: number;
  G03: number;
  G04: number;
  G05: number;
  G06: number;
  G07: number;
  G08: number;
  G09: number;
  G10: number;
  G11: number;
  G12: number;
  G13: number;
  GSHI: string;
  GSLO: string;
  HI: number;
  HIALF: number;
  HIALM: number;
  HP: number;
  HPALF: number;
  HPALM: number;
  KG: number;
  LATCOD: number;
  LCITY: string;
  LEAID: string;
  LEA_NAME: string;
  LONCOD: number;
  LSTATE: string;
  LSTREET1: string;
  LSTREET2: string;
  LZIP: string;
  LZIP4: string;
  MAGNET_TEXT: string;
  MEMBER: number;
  NCESSCH: string;
  NMCNTY: string;
  OBJECTID: number;
  PHONE: string;
  PK: number;
  REDLCH: number;
  SCHOOL_LEVEL: string;
  SCHOOL_TYPE_TEXT: string;
  SCH_NAME: string;
  STABR: string;
  STATUS: string;
  STITLEI: string;
  STUTERATIO: number;
  ST_LEAID: string;
  SURVYEAR: string;
  SY_STATUS_TEXT: string;
  TITLEI: string;
  TOTAL: number;
  TOTFENROL: number;
  TOTFRL: number;
  TOTMENROL: number;
  TR: number;
  TRALF: number;
  TRALM: number;
  UG: null;
  ULOCALE: string;
  VIRTUAL: string;
  WH: number;
  WHALF: number;
  WHALM: number;
}

export interface NCESSchoolDetailFeature {
  attributes?: NCESSchoolDetailFeatureAttributes;
  geometry?: {
    x: number;
    y: number;
  };
}

export interface NCESDistrictFeatureAttributes {
  OBJECTID: number;
  LEAID: string;
  NAME: string;
  OPSTFIPS: string;
  LSTREE: string;
  LCITY: string;
  LSTATE: string;
  LZIP: string;
  LZIP4: string;
  STFIP15: string;
  CNTY15: string;
  NMCNTY15: string;
  LAT1516: number;
  LON1516: number;
  CBSA15: string;
  NMCBSA15: string;
  CBSATYPE15: string;
  CSA15: string;
  NMCSA15: string;
  NECTA15: string;
  NMNECTA15: string;
  CD15: string;
  SLDL15: string;
  SLDU15: string;
}

export interface NCESDistrictFeature {
  attributes?: NCESDistrictFeatureAttributes;
  geometry?: {
    x: number;
    y: number;
  };
}

export interface NCESDistrictDetailAttributes {
  COID: string;
  CONAME: string;
  GSHI: string;
  GSLO: string;
  LCITY: string;
  LEAID: string;
  LEA_NAME: string;
  LEA_TYPE: number;
  LEA_TYPE_TEXT: string;
  LOCALE: string;
  LOCALE_TEXT: string;
  LSTATE: string;
  LSTREET1: string;
  LSTREET2: string;
  LZIP: string;
  LZIP4: string;
  Lat: number;
  Long: number;
  MEMBER: number;
  OBJECTID: number;
  PHONE: string;
  /**
   * Number of schools within the district
   */
  SCH: number;
  STABR: string;
  STATENAME: string;
  STUTERATIO: number;
  ST_LEAID: string;
  SURVYEAR: string;
  SY_STATUS_TEXT: string;
  Shape_Area: number;
  Shape_Length: number;
  TOTTCH: number;
}

export interface NCESDistrictDetailFeature {
  attributes?: NCESDistrictDetailAttributes;
  geometry?: {
    x: number;
    y: number;
  };
}

export type SearchSchoolDistrictsResponse = {
  features: NCESDistrictFeature[];
};

export type SearchSchoolsResponse = {
  features: NCESSchoolFeature[];
};

export type SchoolDistrictDetailResponse = {
  features: NCESDistrictDetailFeature[];
};

export type SchoolDetailResponse = {
  features: NCESSchoolDetailFeature[];
};

export function getSearchSchoolDistrictsURL(districtName: string): string {
  const query = `UPPER(NAME) LIKE UPPER('%${districtName}%')`;

  return `https://nces.ed.gov/opengis/rest/services/K12_School_Locations/EDGE_GEOCODE_PUBLICLEA_1516/MapServer/0/query?where=${encodeURIComponent(
    query,
  )}&outFields=*&outSR=4326&f=json`;
}

export function getSchoolDistrictDetailsURL(districtId: string): string {
  const query = `LEAID = '${districtId}'`;

  return `https://nces.ed.gov/opengis/rest/services/School_District_Boundaries/EDGE_ADMINDATA_SCHOOLDISTRICTS_SY1920/MapServer/0/query?where=${encodeURIComponent(
    query,
  )}&outFields=*&outSR=4326&f=json`;
}

export type GetSearchSchoolsURLOpts = {
  searchPrivate?: boolean;
};

export function getSearchSchoolsURL(
  schoolName: string,
  districtId: string,
  { searchPrivate = false }: GetSearchSchoolsURLOpts,
): string {
  let query = `UPPER(NAME) LIKE UPPER('%${schoolName}%')`;

  if (districtId != null) {
    query += ` AND LEAID = '${districtId}'`;
  }

  return `https://services1.arcgis.com/Ua5sjt3LWTPigjyD/arcgis/rest/services/${
    searchPrivate ? 'Private_School_Locations_Current' : 'Public_School_Location_201819'
  }/FeatureServer/0/query?where=${encodeURIComponent(query)}&outFields=*&outSR=4326&f=json`;
}

export function getSchoolDetailsURL(districtId: string, schoolId: string): string {
  const query = `LEAID = '${districtId}' AND NCESSCH = '${schoolId}'`;

  return `https://nces.ed.gov/opengis/rest/services/K12_School_Locations/EDGE_ADMINDATA_PUBLICSCH_1920/MapServer/0/query?outFields=*&where=${encodeURIComponent(
    query,
  )}&f=json`;
}
