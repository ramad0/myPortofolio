const Services = require ('../models/servicesModel');
exports.creatServices = async(req,res)=>{
    const myService = await Services.create(req.body);
    res.status(201).json(myService)
}
exports.getServices = async(req,res)=>{
    const myServices = await Services.find();
    res.status(200).json(myServices)
}

exports.updateServices = async (req, res) => {
    try {
        const { id } = req.params;
        const { services_i, services_name, services_disc } = req.body;

        const updatedData = {
            ...(services_i && { services_i }),
            ...(services_name && { services_name }),
            ...(services_disc && { services_disc }),
            };

        const updatedServices = await Services.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedServices) {
            return res.status(404).json({ message: 'Services not found' });
        }

        res.status(200).json({ message: 'Services updated successfully', Services: updatedServices });
    } catch (err) {
        res.status(500).json({ message: 'Error updating Services', error: err.message });
    }
};

exports.deleteServices = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedServices = await Services.findByIdAndDelete(id);

        if (!deletedServices) {
            return res.status(404).json({ message: 'Services not found' });
        }

        res.status(200).json({ message: 'Services deleted successfully', Services: deletedServices });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting Services', error: err.message });
    }
};