async function seedModes(dataSource) {
  const modeRepo = dataSource.getRepository("Mode");

  const modes = [
    { name: "upi" },
    { name: "cash" },
    { name: "account_transfer" },
    { name: "cheque" },
    { name: "debit_card" },
    { name: "credit_card" },
    { name: "mobile_wallet" },
    { name: "aep" },
    { name: "net_banking" },
    { name: "ussd" },
    { name: "prepaid_card" },
    { name: "nach" },
  ];

  for (const modeData of modes) {
    // Check if mode already exists to avoid duplicates
    const existing = await modeRepo.findOneBy({ name: modeData.name });
    if (!existing) {
      const mode = modeRepo.create(modeData);
      await modeRepo.save(mode);
    }
  }

  console.log("Modes seeded successfully");
}


module.exports=seedModes;