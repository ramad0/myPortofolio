const Footer = require ('../models/footerModel');
exports.createFooter = async (req, res) => {
    try {
      const myFooter = await Footer.create(req.body);
      res.status(201).json(myFooter);
    } catch (error) {
      console.error('Error creating footer:', error);
      res.status(500).json({ message: 'Error creating footer', error });
    }
  };
  
exports.getFooter = async(req,res)=>{
    const myFooter = await Footer.find();
    res.status(200).json(myFooter)
}

  exports.updateFooter =async(req,res)=>{
    try{
      const { id } = req.params;
      const { footer_name } = req.body;

      const updatedData = {...(footer_name && {footer_name})};
      const updatedFooter = await Footer.findByIdAndUpdate(id,updatedData,{new : true});
      if(!updatedFooter){
        return res.status(404).json({ message: 'Footer not found' });
      }
      res.status(200).json({ message: 'Footer updated successfully', Footer: updatedFooter });
    }catch (err) {
          res.status(500).json({ message: 'Error updating Footer', error: err.message });
      }
  };

  exports.deleteFooter = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFooter = await Footer.findByIdAndDelete(id);

        if (!deletedFooter) {
            return res.status(404).json({ message: 'Footer not found' });
        }

        res.status(200).json({ message: 'Footer deleted successfully', Footer: deletedFooter });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting Footer', error: err.message });
    }
};

