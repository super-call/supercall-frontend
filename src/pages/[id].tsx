import { setInitialState } from "@/components/Flow/CallNode/callNodeSlice";
import { setNodeEdges } from "@/components/Flow/nodeDataSlice";
import Layout from "@/components/Layout/Layout";
import superCallService from "@/services/supercallService";
import FlowView from "@/views/FlowView";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SharePage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (id) {
      superCallService
        .getSuperCall(id as string)
        .then((res) => {
          dispatch(setInitialState(res.data.nodeState));
          dispatch(setNodeEdges(res.data.nodeEdges));
          setNodes(res.data.nodeData);
          setEdges(res.data.nodeEdges);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, dispatch]);

  return (
    <Layout>
      <FlowView
        data={{
          nodes,
          edges,
        }}
      />
    </Layout>
  );
}
