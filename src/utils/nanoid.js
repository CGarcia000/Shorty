import { customAlphabet, urlAlphabet } from "nanoid";

const nano = customAlphabet(urlAlphabet, 15);

export default nano;