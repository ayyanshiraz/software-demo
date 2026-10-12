// src/context/ErpContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface InventoryItem {
  id: number;
  product: string;
  sku: string;
  size: string;
  stock: number;
  status: string;
  color: string;
  ledgerRoute: string;
  cogsRoute: string;
  directSale: boolean;
  productionConsumption: boolean;
  category: string;
  unitPrice: number;
  bom?: {
    primary?: string;
    secondary?: string;
    aux?: string;
  };
}

export interface LedgerMapping {
  code: string;
  name: string;
  asset: string;
  cogs: string;
}

export interface LedgerEvent {
  id: number;
  type: string;
  ref: string;
  item: string;
  qty: number;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  timestamp: string;
  status?: string;
}

export interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  color: string;
}

export interface AttendanceRecord {
  date: string;
  id: string;
  name: string;
  timeIn: string;
  timeOut: string;
  status: string;
  color: string;
}

export interface SalaryRecord {
  id: string;
  name: string;
  basic: string;
  allowances: string;
  deductions: string;
  net: string;
  status: string;
  color: string;
}

export interface FinancialRecord {
  id: string;
  name: string;
  advanceAmt: string;
  advanceRec: string;
  loanAmt: string;
  installment: string;
  outstanding: string;
}

export interface GatePassRecord {
  id: string;
  name: string;
  type: string;
  reason: string;
  outTime: string;
  inTime: string;
  status: string;
  typeColor: string;
  statusColor: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  initials: string;
  color: string;
}

export interface ProductionBatch {
  batchId: string;
  productCode: string;
  productName: string;
  targetYield: number;
  status: string;
  timestamp: string;
  impacts: {
    item: string;
    action: string;
    qty: string;
    stockImpact: string;
    color: string;
    bg: string;
  }[];
}

export type NewInventoryInput = Omit<InventoryItem, "id" | "status" | "color">;

interface ErpContextType {
  inventory: InventoryItem[];
  mappings: LedgerMapping[];
  ledgerEvents: LedgerEvent[];
  employees: EmployeeRecord[];
  attendance: AttendanceRecord[];
  salaries: SalaryRecord[];
  loans: FinancialRecord[];
  gatePasses: GatePassRecord[];
  users: UserRecord[];
  productionBatches: ProductionBatch[];
  verifiedPayables: number;
  pendingPoValue: number;
  recognizedRevenue: number;
  addInventoryItem: (item: NewInventoryInput) => void;
  updateInventoryStock: (id: number, newStock: number) => void;
  deleteInventoryItem: (id: number) => void;
  addLedgerMapping: (mapping: LedgerMapping) => void;
  executePurchaseGRN: (params: { sku: string; productName: string; qty: number; billedValue: number; expectedValue: number; department: string }) => void;
  executeSaleTransaction: (params: { orderRef: string; skuOrName: string; qty: number; unitPrice?: number }) => void;
  executeProductionBatch: (params: { finishedSku: string; batchQty: number }) => void;
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeRecord[]>>;
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  setSalaries: React.Dispatch<React.SetStateAction<SalaryRecord[]>>;
  setLoans: React.Dispatch<React.SetStateAction<FinancialRecord[]>>;
  setGatePasses: React.Dispatch<React.SetStateAction<GatePassRecord[]>>;
  setUsers: React.Dispatch<React.SetStateAction<UserRecord[]>>;
  resetDemoData: () => void;
}

const defaultInventory: InventoryItem[] = [
  { id: 1, product: "EV Scooty Main Frame", sku: "EV-FRM-01", size: "10 Kgs", stock: 45, status: "In Stock", color: "bg-emerald-50 text-emerald-600", ledgerRoute: "1010 - Inventory Asset", cogsRoute: "5010 - COGS Raw", directSale: true, productionConsumption: true, category: "Finished Product", unitPrice: 450, bom: { primary: "RM-STEEL", secondary: "RM-MOTOR", aux: "RM-TUBE" } },
  { id: 2, product: "Swing Arm Assembly", sku: "EV-SWA-02", size: "25 Kgs", stock: 12, status: "Low Stock", color: "bg-amber-50 text-amber-600", ledgerRoute: "1020 - Finished Goods", cogsRoute: "5020 - COGS Finished", directSale: true, productionConsumption: true, category: "Finished Product", unitPrice: 320 },
  { id: 3, product: "Sheet Metal Stamping Part", sku: "SMS-PTS-03", size: "5 Feet", stock: 120, status: "In Stock", color: "bg-emerald-50 text-emerald-600", ledgerRoute: "1010 - Inventory Asset", cogsRoute: "5010 - COGS Raw", directSale: true, productionConsumption: true, category: "Finished Product", unitPrice: 180 },
  { id: 4, product: "Precision Auto Component", sku: "PAC-AUT-04", size: "10 Feet", stock: 18, status: "In Stock", color: "bg-emerald-50 text-emerald-600", ledgerRoute: "1020 - Finished Goods", cogsRoute: "5020 - COGS Finished", directSale: true, productionConsumption: false, category: "Finished Product", unitPrice: 550 },
  { id: 5, product: "Grade A Sheet Steel", sku: "RM-STEEL", size: "500 Kgs", stock: 1500, status: "In Stock", color: "bg-emerald-50 text-emerald-600", ledgerRoute: "1010 - Inventory Asset", cogsRoute: "5010 - COGS Raw", directSale: true, productionConsumption: true, category: "Raw Material", unitPrice: 120 },
  { id: 6, product: "Electric Motor Assembly", sku: "RM-MOTOR", size: "15 Kgs", stock: 85, status: "In Stock", color: "bg-emerald-50 text-emerald-600", ledgerRoute: "1010 - Inventory Asset", cogsRoute: "5010 - COGS Raw", directSale: false, productionConsumption: true, category: "Raw Material", unitPrice: 280 },
  { id: 7, product: "Steel Tubing Structure", sku: "RM-TUBE", size: "20 Feet", stock: 640, status: "In Stock", color: "bg-emerald-50 text-emerald-600", ledgerRoute: "1010 - Inventory Asset", cogsRoute: "5010 - COGS Raw", directSale: true, productionConsumption: true, category: "Raw Material", unitPrice: 95 }
];

const defaultMappings: LedgerMapping[] = [
  { code: "EV-FRM-01", name: "EV Scooty Main Frame", asset: "1010 - Inventory Asset", cogs: "5010 - COGS Raw" },
  { code: "EV-SWA-02", name: "Swing Arm Assembly", asset: "1020 - Finished Goods", cogs: "5020 - COGS Finished" },
  { code: "SMS-PTS-03", name: "Sheet Metal Stamping Part", asset: "1010 - Inventory Asset", cogs: "5010 - COGS Raw" },
  { code: "PAC-AUT-04", name: "Precision Auto Component", asset: "1020 - Finished Goods", cogs: "5020 - COGS Finished" },
  { code: "RM-STEEL", name: "Grade A Sheet Steel", asset: "1010 - Inventory Asset", cogs: "5010 - COGS Raw" },
  { code: "RM-MOTOR", name: "Electric Motor Assembly", asset: "1010 - Inventory Asset", cogs: "5010 - COGS Raw" },
  { code: "RM-TUBE", name: "Steel Tubing Structure", asset: "1010 - Inventory Asset", cogs: "5010 - COGS Raw" }
];

const defaultLedgerEvents: LedgerEvent[] = [
  {
    id: 101,
    type: "GRN",
    ref: "GRN-992",
    item: "EV-FRM-01: EV Scooty Main Frame",
    qty: 20,
    debitAccount: "1010 - Inventory Asset",
    creditAccount: "2010 - Accounts Payable",
    amount: 5000,
    timestamp: new Date().toISOString(),
    status: "Verified"
  }
];

const defaultEmployees: EmployeeRecord[] = [
  { id: "EMP-001", name: "Ali Khan", email: "ali@bizvibez.com", role: "Software Engineer", status: "Active", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" },
  { id: "EMP-002", name: "Sara Ahmed", email: "sara@bizvibez.com", role: "HR Manager", status: "On Leave", color: "bg-amber-50 text-amber-600 ring-1 ring-amber-500/20" },
  { id: "EMP-003", name: "Usman Asif", email: "usman@bizvibez.com", role: "Sales Lead", status: "Active", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" },
  { id: "EMP-004", name: "Ajwa Arshad", email: "ajwa@bizvibez.com", role: "System Architect", status: "Active", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" }
];

const defaultAttendance: AttendanceRecord[] = [
  { date: "2026-10-06", id: "EMP-001", name: "Ali Khan", timeIn: "09:00 AM", timeOut: "06:00 PM", status: "Present", color: "bg-blue-50 text-blue-600 ring-1 ring-blue-500/20" },
  { date: "2026-10-06", id: "EMP-002", name: "Sara Ahmed", timeIn: "---", timeOut: "---", status: "Absent", color: "bg-rose-50 text-rose-600 ring-1 ring-rose-500/20" },
  { date: "2026-10-06", id: "EMP-003", name: "Usman Asif", timeIn: "09:15 AM", timeOut: "Pending", status: "In Office", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" }
];

const defaultSalaries: SalaryRecord[] = [
  { id: "EMP-001", name: "Ali Khan", basic: "$2,000", allowances: "$500", deductions: "$600", net: "$1,900", status: "Pending", color: "bg-amber-50 text-amber-600 ring-1 ring-amber-500/20" },
  { id: "EMP-002", name: "Sara Ahmed", basic: "$2,500", allowances: "$600", deductions: "$0", net: "$3,100", status: "Processed", color: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20" }
];

const defaultLoans: FinancialRecord[] = [
  { id: "EMP-001", name: "Ali Khan", advanceAmt: "$500", advanceRec: "$100", loanAmt: "$5,000", installment: "$500", outstanding: "$3,000" },
  { id: "EMP-003", name: "Usman Asif", advanceAmt: "$0", advanceRec: "$0", loanAmt: "$2,000", installment: "$200", outstanding: "$1,800" }
];

const defaultGatePasses: GatePassRecord[] = [
  { id: "GP-1001", name: "Ali Khan", type: "Official Use", reason: "Client meeting at Gulberg HQ", outTime: "10:30 AM", inTime: "01:45 PM", status: "Closed", typeColor: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20", statusColor: "bg-slate-100 text-slate-600" },
  { id: "GP-1002", name: "Sara Ahmed", type: "Personal Use", reason: "Bank visit for personal work", outTime: "11:15 AM", inTime: "Pending", status: "Active", typeColor: "bg-rose-50 text-rose-700 ring-1 ring-rose-500/20", statusColor: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/30" },
  { id: "GP-1003", name: "Usman Asif", type: "Official Use", reason: "Site inspection and hardware delivery", outTime: "02:00 PM", inTime: "04:30 PM", status: "Closed", typeColor: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20", statusColor: "bg-slate-100 text-slate-600" }
];

const defaultUsers: UserRecord[] = [
  { id: "USR-001", name: "Yasir Irshad", email: "yasir@blackzero.org", role: "Super Admin", status: "Active", lastLogin: "2 mins ago", initials: "YI", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { id: "USR-002", name: "Ayyan Shiraz", email: "ayyan@blackzero.org", role: "System Admin", status: "Active", lastLogin: "1 hour ago", initials: "AS", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "USR-003", name: "Ajwa Arshad", email: "ajwa@blackzero.org", role: "System Admin", status: "Active", lastLogin: "Just now", initials: "AA", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "USR-004", name: "Alishba Zia", email: "alishba@blackzero.org", role: "Manager", status: "Active", lastLogin: "5 hours ago", initials: "AZ", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { id: "USR-005", name: "Usman Asif", email: "usman@blackzero.org", role: "Sales Agent", status: "Invite Pending", lastLogin: "Never", initials: "UA", color: "bg-amber-100 text-amber-700 border-amber-200" }
];

const defaultBatches: ProductionBatch[] = [
  {
    batchId: "EV-BATCH-8094",
    productCode: "EV-FRM-01",
    productName: "EV Scooty Main Frame",
    targetYield: 50,
    status: "Completed & Synced",
    timestamp: new Date().toISOString(),
    impacts: [
      { item: "Grade A Sheet Steel", action: "CONSUMPTION", qty: "-1,250 Kgs", stockImpact: "Inventory Deducted", color: "text-rose-600", bg: "bg-rose-50/80" },
      { item: "Electric Motor Assembly", action: "CONSUMPTION", qty: "-50 Units", stockImpact: "Inventory Deducted", color: "text-rose-600", bg: "bg-rose-50/80" },
      { item: "Steel Tubing Structure", action: "CONSUMPTION", qty: "-500 Feet", stockImpact: "Inventory Deducted", color: "text-rose-600", bg: "bg-rose-50/80" },
      { item: "EV Scooty Main Frame", action: "FINISHED YIELD", qty: "+50 Units", stockImpact: "Added to Inventory", color: "text-emerald-600", bg: "bg-emerald-50/80" }
    ]
  }
];

const ErpContext = createContext<ErpContextType | undefined>(undefined);

export function ErpProvider({ children }: { children: React.ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>(defaultInventory);
  const [mappings, setMappings] = useState<LedgerMapping[]>(defaultMappings);
  const [ledgerEvents, setLedgerEvents] = useState<LedgerEvent[]>(defaultLedgerEvents);
  const [employees, setEmployees] = useState<EmployeeRecord[]>(defaultEmployees);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(defaultAttendance);
  const [salaries, setSalaries] = useState<SalaryRecord[]>(defaultSalaries);
  const [loans, setLoans] = useState<FinancialRecord[]>(defaultLoans);
  const [gatePasses, setGatePasses] = useState<GatePassRecord[]>(defaultGatePasses);
  const [users, setUsers] = useState<UserRecord[]>(defaultUsers);
  const [productionBatches, setProductionBatches] = useState<ProductionBatch[]>(defaultBatches);
  const [verifiedPayables, setVerifiedPayables] = useState<number>(84230);
  const [pendingPoValue, setPendingPoValue] = useState<number>(12000);
  const [recognizedRevenue, setRecognizedRevenue] = useState<number>(345231);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedStore = localStorage.getItem("covico_erp_master_store_v1");
      if (savedStore) {
        const parsed = JSON.parse(savedStore);
        if (parsed.inventory) setInventory(parsed.inventory);
        if (parsed.mappings) setMappings(parsed.mappings);
        if (parsed.ledgerEvents) setLedgerEvents(parsed.ledgerEvents);
        if (parsed.employees) setEmployees(parsed.employees);
        if (parsed.attendance) setAttendance(parsed.attendance);
        if (parsed.salaries) setSalaries(parsed.salaries);
        if (parsed.loans) setLoans(parsed.loans);
        if (parsed.gatePasses) setGatePasses(parsed.gatePasses);
        if (parsed.users) setUsers(parsed.users);
        if (parsed.productionBatches) setProductionBatches(parsed.productionBatches);
        if (typeof parsed.verifiedPayables === "number") setVerifiedPayables(parsed.verifiedPayables);
        if (typeof parsed.pendingPoValue === "number") setPendingPoValue(parsed.pendingPoValue);
        if (typeof parsed.recognizedRevenue === "number") setRecognizedRevenue(parsed.recognizedRevenue);
      }
    } catch (e) {
      console.error("Failed to load ERP store", e);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      const storeToSave = {
        inventory,
        mappings,
        ledgerEvents,
        employees,
        attendance,
        salaries,
        loans,
        gatePasses,
        users,
        productionBatches,
        verifiedPayables,
        pendingPoValue,
        recognizedRevenue
      };
      localStorage.setItem("covico_erp_master_store_v1", JSON.stringify(storeToSave));
    } catch (e) {
      console.error("Failed to save ERP store", e);
    }
  }, [
    inventory,
    mappings,
    ledgerEvents,
    employees,
    attendance,
    salaries,
    loans,
    gatePasses,
    users,
    productionBatches,
    verifiedPayables,
    pendingPoValue,
    recognizedRevenue,
    isHydrated
  ]);

  const computeStatusAndColor = (stockNum: number) => {
    const status = stockNum > 0 ? (stockNum < 15 ? "Low Stock" : "In Stock") : "Out of Stock";
    const color = stockNum > 0 ? (stockNum < 15 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600") : "bg-rose-50 text-rose-600";
    return { status, color };
  };

  const addInventoryItem = (newItemData: NewInventoryInput) => {
    const { status, color } = computeStatusAndColor(newItemData.stock);
    const newItem: InventoryItem = {
      ...newItemData,
      id: Date.now(),
      status,
      color
    };

    setInventory((prev: InventoryItem[]) => [
      newItem,
      ...prev.filter((i: InventoryItem) => i.sku !== newItem.sku)
    ]);

    setMappings((prev: LedgerMapping[]) => {
      const exists = prev.some((m: LedgerMapping) => m.code === newItem.sku);
      if (exists) return prev;
      return [
        {
          code: newItem.sku,
          name: newItem.product,
          asset: newItem.ledgerRoute || "1010 - Inventory Asset",
          cogs: newItem.cogsRoute || "5010 - COGS Raw"
        },
        ...prev
      ];
    });
  };

  const updateInventoryStock = (id: number, newStock: number) => {
    const { status, color } = computeStatusAndColor(newStock);
    setInventory((prev: InventoryItem[]) =>
      prev.map((item: InventoryItem) =>
        item.id === id ? { ...item, stock: newStock, status, color } : item
      )
    );
  };

  const deleteInventoryItem = (id: number) => {
    const target = inventory.find((i: InventoryItem) => i.id === id);
    setInventory((prev: InventoryItem[]) => prev.filter((item: InventoryItem) => item.id !== id));
    if (target) {
      setMappings((prev: LedgerMapping[]) => prev.filter((m: LedgerMapping) => m.code !== target.sku));
    }
  };

  const addLedgerMapping = (mapping: LedgerMapping) => {
    setMappings((prev: LedgerMapping[]) => [
      mapping,
      ...prev.filter((m: LedgerMapping) => m.code !== mapping.code)
    ]);
    setInventory((prev: InventoryItem[]) => {
      const exists = prev.some((i: InventoryItem) => i.sku === mapping.code);
      if (exists) return prev;
      const { status, color } = computeStatusAndColor(25);
      return [
        {
          id: Date.now(),
          product: mapping.name,
          sku: mapping.code,
          size: "10 Kgs",
          stock: 25,
          status,
          color,
          ledgerRoute: mapping.asset,
          cogsRoute: mapping.cogs,
          directSale: true,
          productionConsumption: true,
          category: mapping.asset.includes("1020") ? "Finished Product" : "Raw Material",
          unitPrice: 350
        },
        ...prev
      ];
    });
  };

  const executePurchaseGRN = ({
    sku,
    productName,
    qty,
    billedValue,
    expectedValue,
    department
  }: {
    sku: string;
    productName: string;
    qty: number;
    billedValue: number;
    expectedValue: number;
    department: string;
  }) => {
    const isMismatch = billedValue !== expectedValue;

    setInventory((prev: InventoryItem[]) => {
      const existing = prev.find(
        (i: InventoryItem) => i.sku === sku || i.product === productName
      );
      if (existing) {
        const updatedStock = existing.stock + qty;
        const { status, color } = computeStatusAndColor(updatedStock);
        return prev.map((i: InventoryItem) =>
          i.id === existing.id ? { ...i, stock: updatedStock, status, color } : i
        );
      } else {
        const { status, color } = computeStatusAndColor(qty);
        return [
          {
            id: Date.now(),
            product: productName,
            sku,
            size: "Standard",
            stock: qty,
            status,
            color,
            ledgerRoute: "1010 - Inventory Asset",
            cogsRoute: "5010 - COGS Raw",
            directSale: true,
            productionConsumption: true,
            category: "Raw Material",
            unitPrice: Math.round(billedValue / (qty || 1))
          },
          ...prev
        ];
      }
    });

    const grnRef = `GRN-${Math.floor(100 + Math.random() * 900)}`;
    const newEvent: LedgerEvent = {
      id: Date.now(),
      type: "GRN",
      ref: `${grnRef} (${department || "Factory"})`,
      item: `${sku}: ${productName}`,
      qty,
      debitAccount: "1010 - Inventory Asset",
      creditAccount: "2010 - Accounts Payable",
      amount: billedValue,
      timestamp: new Date().toISOString(),
      status: isMismatch ? "Held - Variance Override" : "Verified"
    };
    setLedgerEvents((prev: LedgerEvent[]) => [newEvent, ...prev]);

    if (!isMismatch) {
      setVerifiedPayables((prev: number) => prev + billedValue);
    } else {
      setPendingPoValue((prev: number) => prev + billedValue);
    }
  };

  const executeSaleTransaction = ({
    orderRef,
    skuOrName,
    qty,
    unitPrice = 450
  }: {
    orderRef: string;
    skuOrName: string;
    qty: number;
    unitPrice?: number;
  }) => {
    let resolvedPrice = unitPrice;

    setInventory((prev: InventoryItem[]) =>
      prev.map((item: InventoryItem) => {
        if (skuOrName.includes(item.sku) || skuOrName.includes(item.product)) {
          resolvedPrice = item.unitPrice || unitPrice;
          const updatedStock = Math.max(0, item.stock - qty);
          const { status, color } = computeStatusAndColor(updatedStock);
          return { ...item, stock: updatedStock, status, color };
        }
        return item;
      })
    );

    const totalAmount = qty * resolvedPrice;

    const newEvent: LedgerEvent = {
      id: Date.now(),
      type: "SALE",
      ref: orderRef,
      item: skuOrName,
      qty,
      debitAccount: "1200 - Accounts Receivable",
      creditAccount: "4010 - Sales Revenue",
      amount: totalAmount,
      timestamp: new Date().toISOString(),
      status: "Dispatched"
    };
    setLedgerEvents((prev: LedgerEvent[]) => [newEvent, ...prev]);
    setRecognizedRevenue((prev: number) => prev + totalAmount);
  };

  const executeProductionBatch = ({
    finishedSku,
    batchQty
  }: {
    finishedSku: string;
    batchQty: number;
  }) => {
    const targetProduct =
      inventory.find((i: InventoryItem) => i.sku === finishedSku) || inventory[0];

    setInventory((prev: InventoryItem[]) =>
      prev.map((item: InventoryItem) => {
        if (item.sku === targetProduct.sku) {
          const newStock = item.stock + batchQty;
          const { status, color } = computeStatusAndColor(newStock);
          return { ...item, stock: newStock, status, color };
        }
        if (item.sku === "RM-STEEL") {
          const newStock = Math.max(0, item.stock - batchQty * 5);
          const { status, color } = computeStatusAndColor(newStock);
          return { ...item, stock: newStock, status, color };
        }
        if (item.sku === "RM-MOTOR") {
          const newStock = Math.max(0, item.stock - batchQty);
          const { status, color } = computeStatusAndColor(newStock);
          return { ...item, stock: newStock, status, color };
        }
        if (item.sku === "RM-TUBE") {
          const newStock = Math.max(0, item.stock - batchQty * 2);
          const { status, color } = computeStatusAndColor(newStock);
          return { ...item, stock: newStock, status, color };
        }
        return item;
      })
    );

    const newBatchId = `EV-BATCH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBatch: ProductionBatch = {
      batchId: newBatchId,
      productCode: targetProduct.sku,
      productName: targetProduct.product,
      targetYield: batchQty,
      status: "Completed & Synced",
      timestamp: new Date().toISOString(),
      impacts: [
        { item: "Grade A Sheet Steel", action: "CONSUMPTION", qty: `-${batchQty * 5} Kgs`, stockImpact: "Inventory Deducted", color: "text-rose-600", bg: "bg-rose-50/80" },
        { item: "Electric Motor Assembly", action: "CONSUMPTION", qty: `-${batchQty} Units`, stockImpact: "Inventory Deducted", color: "text-rose-600", bg: "bg-rose-50/80" },
        { item: "Steel Tubing Structure", action: "CONSUMPTION", qty: `-${batchQty * 2} Feet`, stockImpact: "Inventory Deducted", color: "text-rose-600", bg: "bg-rose-50/80" },
        { item: targetProduct.product, action: "FINISHED YIELD", qty: `+${batchQty} Units`, stockImpact: "Added to Inventory", color: "text-emerald-600", bg: "bg-emerald-50/80" }
      ]
    };

    setProductionBatches((prev: ProductionBatch[]) => [newBatch, ...prev]);

    setLedgerEvents((prev: LedgerEvent[]) => [
      {
        id: Date.now(),
        type: "PRODUCTION",
        ref: newBatchId,
        item: `${targetProduct.sku}: ${targetProduct.product}`,
        qty: batchQty,
        debitAccount: "1020 - Finished Goods",
        creditAccount: "1010 - Raw Material Inventory",
        amount: batchQty * 300,
        timestamp: new Date().toISOString(),
        status: "Synced"
      },
      ...prev
    ]);
  };

  const resetDemoData = () => {
    localStorage.removeItem("covico_erp_master_store_v1");
    setInventory(defaultInventory);
    setMappings(defaultMappings);
    setLedgerEvents(defaultLedgerEvents);
    setEmployees(defaultEmployees);
    setAttendance(defaultAttendance);
    setSalaries(defaultSalaries);
    setLoans(defaultLoans);
    setGatePasses(defaultGatePasses);
    setUsers(defaultUsers);
    setProductionBatches(defaultBatches);
    setVerifiedPayables(84230);
    setPendingPoValue(12000);
    setRecognizedRevenue(345231);
  };

  return (
    <ErpContext.Provider
      value={{
        inventory,
        mappings,
        ledgerEvents,
        employees,
        attendance,
        salaries,
        loans,
        gatePasses,
        users,
        productionBatches,
        verifiedPayables,
        pendingPoValue,
        recognizedRevenue,
        addInventoryItem,
        updateInventoryStock,
        deleteInventoryItem,
        addLedgerMapping,
        executePurchaseGRN,
        executeSaleTransaction,
        executeProductionBatch,
        setEmployees,
        setAttendance,
        setSalaries,
        setLoans,
        setGatePasses,
        setUsers,
        resetDemoData
      }}
    >
      {children}
    </ErpContext.Provider>
  );
}

export function useErp() {
  const context = useContext(ErpContext);
  if (!context) {
    throw new Error("useErp must be used within an ErpProvider");
  }
  return context;
}