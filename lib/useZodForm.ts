import { useState, useEffect } from "react";
import { ZodFormattedError, ZodType } from "zod";

export function useZodForm<I>(Input: ZodType<I>, DefaultValue?: Partial<I>) {
  const [formbody, setFormBody] = useState<Partial<I>>(DefaultValue as I);
  const [formerror, setFormError] = useState<ZodFormattedError<I>>();

  useEffect(() => {
    const res = Input.safeParse(formbody);
    const data = res.success ? undefined : res.error.format();
    setFormError(data);
  }, [formbody]);

  function editFormBody(KeyToEdit: keyof I, value: any) {
    setFormBody((body) => ({ ...body, [KeyToEdit]: value }));
  }

  return {
    formbody,
    setFormBody,
    formerror,
    editFormBody,
  };
}
