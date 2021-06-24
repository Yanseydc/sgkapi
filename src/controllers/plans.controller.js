import Plan from './../models/Plan';

//bustboy & multer to upload images
export const getPlans = async (req, res) => {
    try {
        console.log('is gettin plans?')
        let plans = await Plan.find();//get all plans

        res.status(200).json(plans);
    } catch(error) {
        console.error('getPlans-error: ', error)
    }
};