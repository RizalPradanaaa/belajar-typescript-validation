import { ZodError, z } from "zod";

describe("Validation", () => {
  it("should support validation", () => {
    const schema = z.string().min(3).max(100);
    const request = "Rizal";
    const result = schema.parse(request);
    expect(result).toBe(request);
  });

  it("should support validate primitive data type", async () => {
    const usernameSchema = z.string().email();
    const isAdminSchema = z.boolean();
    const priceSchema = z.number().min(1000).max(1000000);

    const username = usernameSchema.parse("eko@example.com");
    console.info(username);

    const isAdmin = isAdminSchema.parse(true);
    console.info(isAdmin);

    const price = priceSchema.parse(10000);
    console.info(price);
  });

  it("should support data conversion", async () => {
    const usernameSchema = z.coerce.string().min(3).max(100);
    const isAdminSchema = z.coerce.boolean();
    const priceSchema = z.coerce.number().min(1000).max(1000000);

    const username = usernameSchema.parse(12345);
    console.info(username);

    const isAdmin = isAdminSchema.parse("true");
    console.info(isAdmin);

    const price = priceSchema.parse("10000");
    console.info(price);
  });

  it("should support date validation", async () => {
    const birthDateSchema = z.coerce
      .date()
      .min(new Date(1980, 0, 1))
      .max(new Date(2020, 0, 1));

    const birthDate = birthDateSchema.parse("1990-01-01");
    console.info(birthDate);

    const birthDate2 = birthDateSchema.parse(new Date(1990, 0, 1));
    console.info(birthDate2);
  });

  it("should return zod error if invalid", async () => {
    const schema = z.string().email().min(3).max(100);

    try {
      schema.parse("ek");
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err);
        // err.errors.forEach((error) => {
        //     console.info(error.message);
        // })
      }
    }
  });

  it("should validation object", () => {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(5).max(10),
    });

    const request = {
      email: "rizal@example.com",
      password: "12345",
    };

    const result = loginSchema.parse(request);
    console.info(result);
  });

  it("should nested validation object", () => {
    const userSchema = z.object({
      id: z.number().min(1),
      name: z.string().min(5).max(15),
      address: z.object({
        city: z.string().min(5).max(20),
        province: z.string().min(5).max(20),
      }),
    });

    const request = {
      id: 1,
      name: "Rizal",
      address: {
        city: "Jakarta",
        province: "DKI Jakarta",
      },
    };

    const result = userSchema.parse(request);
    console.info(result);
  });

  //   Collection
  it("should support collection array", () => {
    const schema = z.array(z.string()).min(1).max(10);
    const request: Array<string> = ["a", "b", "c"];
    const result: Array<string> = schema.parse(request);
    console.info(result);
  });

  it("should support collection set", () => {
    const schema = z.set(z.string()).min(1).max(10);
    const request: Set<string> = new Set(["a", "b", "c"]);
    const result: Set<string> = schema.parse(request);
    console.info(result);
  });

  it("should support collection map", () => {
    const schema = z.map(z.string(), z.number());
    const request: Map<string, number> = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const result: Map<string, number> = schema.parse(request);
    console.info(result);
  });

  it("should support validation message", () => {
    const userSchema = z.object({
      email: z.string().email("email must be valid"),
      password: z
        .string()
        .min(5, "password must be at least 5 characters")
        .max(10, "password must be at most 10 characters"),
    });

    const request = {
      email: "rizal@example.com",
      password: "12345",
    };

    try {
      const result = userSchema.parse(request);
      console.info(result);
    } catch (error) {
      if (error instanceof ZodError) {
        console.info(error.errors);
        error.errors.forEach((error) => {
          console.info(error.message);
        });
      }
    }
  });

  it("should support optional validation", () => {
    const registerSchema = z.object({
      username: z.string().min(5).max(10),
      password: z.string().min(5).max(10),
      firstname: z.string().min(5).max(10),
      lastname: z.string().min(5).max(10).optional(),
    });

    const request = {
      username: "rizal",
      password: "12345",
      firstname: "rizal",
    };

    const result = registerSchema.parse(request);
    console.info(result);
  });

  it("should can support transform", () => {
    const schema = z.string().transform((value) => value.toUpperCase());
    const result = schema.parse("rizal");
    console.info(result);
  });
});
