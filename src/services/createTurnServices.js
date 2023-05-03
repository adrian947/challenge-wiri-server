const createTurnServices = async (req, res, { turnManager }) => {
  const { date, name, address, id_doctor, id_patient } = req.body;

  const createdTurn = await turnManager.createTurn({
    date,
    name,
    address,
    id_doctor,
    id_patient,
  });

  return res.status(200).json(createdTurn);
};

module.exports = createTurnServices;
