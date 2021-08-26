import Plan from './../models/Plan';

//bustboy & multer to upload images
export const getPlans = async (req, res) => {
    try {
        let plans = await Plan.find();//get all plans

        res.status(200).json(plans);
    } catch(error) {
        res.json({message: error.response.data.message});
    }
};