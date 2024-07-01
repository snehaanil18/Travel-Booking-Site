const packages = require('../Models/packageSchema');

exports.addPackage = async (req, res) => {
    console.log('Inside addPackage method');
    const { name, location,from,date, description,details, slots, price } = req.body
    const travelImage = req.file.filename
    const userId = req.payload
    console.log(name, location,from,date, description,details, slots, price);
    console.log(userId);
    try {
        const existingPackage = await packages.findOne({ location })
        console.log(existingPackage);
        if (existingPackage) {
            res.status(406).json("Package already exsists")
        }
        else {
            const newPackage = new packages({
                name,
                location,
                from,
                date,
                description,
                details,
                slots,
                price,
                travelImage,
                userId
            })
            await newPackage.save()
            res.status(200).json(newPackage)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.viewPackage = async (req, res) => {
    console.log('Inside ViewPackage method');
    const userId = req.payload
    console.log(userId);
    try {
        const existPackage = await packages.find({ userId })
        console.log(existPackage);
        if (existPackage) {
            res.status(200).json(existPackage)
        }
        else {
            res.status(401).json('database empty')
        }
    }
    catch {
        res.status(500).json('failed' + err)
    }
}

exports.getHomePackages = async (req, res) => {
    console.log('Inside Home Package');
    try {
        const homePackages = await packages.find().limit(4)
        console.log(homePackages);
        if (homePackages) {
            res.status(200).json(homePackages)
        }
        else {
            res.status(401).json('database empty')
        }
    }
    catch (err) {
        res.status(500).json('failed' + err)
    }
}

exports.viewAllPackages = async (req, res) => {
    console.log('Inside viewAllPackage method');
    const searchKey = req.query.search
    console.log(searchKey);
    //case sensitive
    let query = {};

    // Check if searchKey is provided
    if (searchKey) {
        query.location = { $regex: searchKey, $options: "i" };
    }

    try {
        const allPackages = await packages.find(query)
        console.log(allPackages);
        if (allPackages) {
            res.status(200).json(allPackages)
        }
        else {
            res.status(401).json('cant find package')
        }
    }
    catch (err) {
        res.status(500).json('failed' + err)
    }
}


exports.viewDestination = async (req, res) => {
    const { pid } = req.params //get project id
    try {
        const viewDestinationPackage = await packages.findOne({ _id: pid })
        //Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion.
        res.status(200).json(viewDestinationPackage)
    }
    catch (err) {
        res.status(401).json({ message: err.message })
    }
}


exports.deletePackage = async (req, res) => {
    const { pid } = req.params //get project id
    try {
        const deleteUserPackage = await packages.findOneAndDelete({ _id: pid })
        //Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion.
        res.status(200).json(deleteUserPackage)
    }
    catch (err) {
        res.status(401).json({ message: err.message })
    }
}


exports.updateUserPackage = async(req,res) => {
    console.log('Inside update method');
    const { name, location,from,date, description,details, slots, price  } = req.body
    userId = req.payload
    const {pid} = req.params
    try{
        const updatePackage = await packages.findByIdAndUpdate({_id:pid},{name, location,from,date, description,details, slots, price,userId})
        await updatePackage.save()
        res.status(200).json(updatePackage)
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}
