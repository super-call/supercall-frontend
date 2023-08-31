import axios from "axios";

const createSuperCall = (data: any) => {
  return axios.post("/api/supercall", data);
};

const getSuperCall = (id: string) => {
  return axios.get(`/api/supercall/${id}`);
};

const superCallService = {
  createSuperCall,
  getSuperCall,
};

export default superCallService;
