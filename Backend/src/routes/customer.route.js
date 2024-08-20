import { Router } from "express";
import {
  getCustomerLifetimeValueByCohorts,
  getCustomersGeoData,
  getNewCustomersInCurrentMonth,
  getRepeatedCustomers,
} from "../controllers/customer.controller.js";
const router = Router();

router.get("/new/", getNewCustomersInCurrentMonth);
router.get("/repeat/:interval", getRepeatedCustomers);
router.get("/geo-location", getCustomersGeoData);
router.get("/cohort", getCustomerLifetimeValueByCohorts);

export { router as customerRouter };
