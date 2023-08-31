import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FilterChain from "./FilterChain";
import { ABICardSet } from "./ABICard/ABICardSet";
import { userContractState } from "../Toolbar/ImportABITool/userContractSlice";
import { ChainID } from "@/constants/chainList";

export default function ManageABI() {
  const [selectedChain, setSelectedChain] = useState(-1);
  const contractData = useSelector(
    (state: { userContract: userContractState }) => {
      return state.userContract.contractData;
    }
  );
  const [selecteedContractData, setSelecteedContractData] = useState(contractData);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    console.log(selectedChain);
    if (selectedChain === -1) {
      setSelecteedContractData(contractData);
    } else if (contractData[selectedChain]) {
      console.log(contractData[selectedChain]);
      setSelecteedContractData({ [selectedChain]: contractData[selectedChain]});
    } else {
      setSelecteedContractData({});
    }
  }, [contractData, selectedChain]);
  return (
    <>
      <div style={{ margin: '3vh 0px'}}>
        <FilterChain selectedChain={selectedChain} setSelectedChain={(id: number) => setSelectedChain(id)} />
      </div>
      {domLoaded ? <ABICardSet contractData={selecteedContractData} /> : <div />}
    </>
  );
}
