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

interface NCESDistrictDetailAttributes {
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

export function getSearchSchoolsURL(schoolName: string, districtId: string, { searchPrivate = false }): string {
  let query = `UPPER(NAME) LIKE UPPER('%${schoolName}%')`;

  if (districtId != null) {
    query += ` AND LEAID = '${districtId}'`;
  }

  return `https://services1.arcgis.com/Ua5sjt3LWTPigjyD/arcgis/rest/services/${
    searchPrivate ? 'Private_School_Locations_Current' : 'Public_School_Location_201819'
  }/FeatureServer/0/query?where=${encodeURIComponent(query)}&outFields=*&outSR=4326&f=json`;
}

const searchSchoolDistricts = async (name: string): Promise<NCESDistrictFeatureAttributes[]> => {
  const publicSchoolEndpoint = `https://nces.ed.gov/opengis/rest/services/K12_School_Locations/EDGE_GEOCODE_PUBLICLEA_1516/MapServer/0/query?where=UPPER(NAME) LIKE UPPER('%${name}%')&outFields=*&outSR=4326&f=json`;
  let combinedData = [];
  const publicResponse = await (await fetch(publicSchoolEndpoint)).json();

  combinedData = [
    ...(publicResponse.features
      ? publicResponse.features.map((feature: NCESDistrictFeature) => {
          return feature.attributes;
        })
      : []),
  ];
  return combinedData;
};

const searchSchools = async (name: string, district?: string): Promise<NCESSchoolFeatureAttributes[]> => {
  const privateSchoolEndpoint = `https://services1.arcgis.com/Ua5sjt3LWTPigjyD/arcgis/rest/services/Private_School_Locations_Current/FeatureServer/0/query?where=UPPER(NAME) LIKE UPPER('%${name}%')${
    district ? `%20AND%20LEAID%20%3D%20'${district}'` : ''
  }&outFields=*&outSR=4326&f=json`;
  const publicSchoolEndpoint = `https://services1.arcgis.com/Ua5sjt3LWTPigjyD/arcgis/rest/services/Public_School_Location_201819/FeatureServer/0/query?where=UPPER(NAME) LIKE UPPER('%${name}%')${
    district ? `%20AND%20LEAID%20%3D%20'${district}'` : ''
  }&outFields=*&outSR=4326&f=json`;
  let combinedData = [];
  const privateResponse = await (await fetch(privateSchoolEndpoint)).json();
  const publicResponse = await (await fetch(publicSchoolEndpoint)).json();

  combinedData = [
    ...(privateResponse.features
      ? privateResponse.features.map((feature: NCESSchoolFeature) => {
          return feature.attributes;
        })
      : []),
    ...(publicResponse.features
      ? publicResponse.features.map((feature: NCESSchoolFeature) => {
          return feature.attributes;
        })
      : []),
  ];
  return combinedData;
};

export { searchSchoolDistricts, searchSchools };
