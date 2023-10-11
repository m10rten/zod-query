import { z } from "zod";
import { IAdapter } from "..";

class DefaultAdapter implements IAdapter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toZod() {
    return z.object({});
  }
}

export default DefaultAdapter;
