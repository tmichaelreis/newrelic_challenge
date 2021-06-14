import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

// Mock fetch()
require("jest-fetch-mock").enableMocks();
