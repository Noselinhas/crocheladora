const Calculator = {
  calculate(data) {
    const materialsCost = (data.materials || []).reduce((s, m) => s + (parseFloat(m.quantity) || 0) * (parseFloat(m.pricePerUnit) || 0), 0);
    const accessoriesCost = (data.accessories || []).reduce((s, a) => s + (parseFloat(a.quantity) || 0) * (parseFloat(a.pricePerUnit) || 0), 0);
    const packagingCost = parseFloat(data.packagingCost) || 0;
    const shippingCost  = parseFloat(data.shippingCost)  || 0;
    const otherCost     = parseFloat(data.otherCost)     || 0;
    const totalMaterials = materialsCost + accessoriesCost + packagingCost + shippingCost + otherCost;

    const totalHours = (parseFloat(data.hoursSpent) || 0) + (parseFloat(data.minutesSpent) || 0) / 60;
    const laborCost = totalHours * (parseFloat(data.hourlyRate) || 0);

    const fixedCost = parseFloat(data.fixedCostPerPiece) || 0;
    const totalCost = totalMaterials + laborCost + fixedCost;

    const profitMargin = parseFloat(data.profitMargin) || 0;
    const profitAmount = totalCost * (profitMargin / 100);
    const finalPrice = totalCost + profitAmount;

    return { materialsCost: totalMaterials, laborCost, fixedCost, totalCost, profitAmount, profitMargin, finalPrice };
  },

  fmt(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
  }
};
