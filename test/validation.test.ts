import { z } from "zod";

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
});
