export interface LastfmAlbumResponse {
  results: Results;
}

export interface Results {
  "opensearch:Query": OpensearchQuery;
  "opensearch:totalResults": string;
  "opensearch:startIndex": string;
  "opensearch:itemsPerPage": string;
  albummatches: Albummatches;
  "@attr": Attr;
}

export interface Attr {
  for: string;
}

export interface Albummatches {
  album: Album[];
}

export interface Album {
  name: string;
  artist: string;
  url: string;
  image: Image[];
  streamable: string;
  mbid: string;
}

export interface Image {
  "#text": string;
  size: Size;
}

export enum Size {
  Extralarge = "extralarge",
  Large = "large",
  Medium = "medium",
  Small = "small",
}

export interface OpensearchQuery {
  "#text": string;
  role: string;
  searchTerms: string;
  startPage: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toLastfmAlbumResponse(json: string): LastfmAlbumResponse {
    return cast(JSON.parse(json), r("LastfmAlbumResponse"));
  }

  public static lastfmAlbumResponseToJson(value: LastfmAlbumResponse): string {
    return JSON.stringify(uncast(value, r("LastfmAlbumResponse")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = ""
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  LastfmAlbumResponse: o(
    [{ json: "results", js: "results", typ: r("Results") }],
    false
  ),
  Results: o(
    [
      {
        json: "opensearch:Query",
        js: "opensearch:Query",
        typ: r("OpensearchQuery"),
      },
      {
        json: "opensearch:totalResults",
        js: "opensearch:totalResults",
        typ: "",
      },
      { json: "opensearch:startIndex", js: "opensearch:startIndex", typ: "" },
      {
        json: "opensearch:itemsPerPage",
        js: "opensearch:itemsPerPage",
        typ: "",
      },
      { json: "albummatches", js: "albummatches", typ: r("Albummatches") },
      { json: "@attr", js: "@attr", typ: r("Attr") },
    ],
    false
  ),
  Attr: o([{ json: "for", js: "for", typ: "" }], false),
  Albummatches: o([{ json: "album", js: "album", typ: a(r("Album")) }], false),
  Album: o(
    [
      { json: "name", js: "name", typ: "" },
      { json: "artist", js: "artist", typ: "" },
      { json: "url", js: "url", typ: "" },
      { json: "image", js: "image", typ: a(r("Image")) },
      { json: "streamable", js: "streamable", typ: "" },
      { json: "mbid", js: "mbid", typ: "" },
    ],
    false
  ),
  Image: o(
    [
      { json: "#text", js: "#text", typ: "" },
      { json: "size", js: "size", typ: r("Size") },
    ],
    false
  ),
  OpensearchQuery: o(
    [
      { json: "#text", js: "#text", typ: "" },
      { json: "role", js: "role", typ: "" },
      { json: "searchTerms", js: "searchTerms", typ: "" },
      { json: "startPage", js: "startPage", typ: "" },
    ],
    false
  ),
  Size: ["extralarge", "large", "medium", "small"],
};
