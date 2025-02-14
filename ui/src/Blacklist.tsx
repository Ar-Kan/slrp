import { useState } from "react";
import { Countries } from "./countries";
import { Facet, IconHeader, LiveFilter, QueryFacets, http, useTitle } from "./util";

type BlacklistItem = {
  Proxy: string;
  Failure: string;
  Sources: string[];
  Provider: string;
  ASN: string;
  Country: string;
};

function Item({ Proxy, Failure, Sources, Provider, ASN, Country }: BlacklistItem) {
  const removeProxy = () => {
    http.delete(`/blacklist/${Proxy.replace("//", "")}`);
    return false;
  };
  return (
    <tr>
      <td>
        <a href="#remove" onClick={removeProxy}>
          x
        </a>
      </td>
      <td className="proxy">
        <del>{Proxy}</del>{" "}
        <sup className="text-muted" title={Sources.join(", ")}>
          {Sources.length} sources
        </sup>
        {/* <small className='text-muted'>{Sources.join(', ')}</small> */}
      </td>
      <td className="country text-muted" title={Countries[Country]?.name}>
        {Countries[Country]?.flag}
      </td>
      <td className="provider text-muted">
        <a href={`https://ipasn.com/asn-downstreams/${ASN}`} rel="noreferrer" target="_blank">
          {Provider}
        </a>
      </td>
      <td className="failure text-muted">{Failure}</td>
    </tr>
  );
}

export default function Blacklist() {
  useTitle("Blacklist");
  const [result, setResult] = useState<{ Facets?: Facet[]; Records?: BlacklistItem[] }>();
  return (
    <div className="card blacklist table-responsive">
      <LiveFilter endpoint="/blacklist" onUpdate={setResult} minDelay={10000} />
      {result && (
        <div>
          <QueryFacets endpoint="/blacklist" {...result} />
          <table className="table text-start table-sm">
            <thead>
              <tr className="text-uppercase text-muted">
                <td />
                <IconHeader icon="link proxy" title="Proxy used" />
                <IconHeader icon="flag country" title="Country" />
                <IconHeader icon="hdd-network provider" title="Provider" />
                <IconHeader icon="emoji-dizzy failure" title="Failure" />
              </tr>
            </thead>
            <tbody>{result.Records && result.Records.map(r => <Item key={r.Proxy} {...r} />)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
