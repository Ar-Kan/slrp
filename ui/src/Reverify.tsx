import { useState } from "react";
import { Countries } from "./countries";
import { Facet, IconHeader, LiveFilter, QueryFacets, http, useTitle } from "./util";

type ReverifyItem = {
  Proxy: string;
  Sources: string[];
  Provider: string;
  ASN: string;
  Country: string;
  Attempt: number;
};

function Item({ Proxy, Sources, Provider, ASN, Country, Attempt }: ReverifyItem) {
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
        {Proxy}{" "}
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
      <td className="attempt text-muted">{Attempt}</td>
    </tr>
  );
}

export default function Reverify() {
  useTitle("Reverify");
  const [result, setResult] = useState<{ Facets: Facet[]; Records?: ReverifyItem[] }>();
  return (
    <div className="card blacklist table-responsive">
      <LiveFilter endpoint="/reverify" onUpdate={setResult} minDelay={10000} />
      {result != null && (
        <div>
          <QueryFacets endpoint="/reverify" {...result} />
          <table className="table text-start table-sm">
            <thead>
              <tr className="text-uppercase text-muted">
                <td />
                <IconHeader icon="link proxy" title="Proxy used" />
                <IconHeader icon="flag country" title="Country" />
                <IconHeader icon="hdd-network provider" title="Provider" />
                <IconHeader icon="hdd-network attempt" title="Attempt" />
              </tr>
            </thead>
            <tbody>{result.Records && result.Records.map(r => <Item key={r.Proxy} {...r} />)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
