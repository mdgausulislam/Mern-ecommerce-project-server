const Page = require("../../models/pageModel");

const createPage = async (req, res) => {
    try {
        const { banners, products } = req.files;
        if (banners && banners.length > 0) {
            req.body.banners = banners.map((banner, index) => ({
                img: `${process.env.API}/public/${banner.filename}`,
                navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
            }));
        }
        if (products && products.length > 0) {
            req.body.products = products.map((product, index) => ({
                img: `${process.env.API}/public/${product.filename}`,
                navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
            }));
        }

        req.body.createdBy = req.user._id;

        let page = await Page.findOne({ category: req.body.category });
    
        if (page) {
            page = await Page.findOneAndUpdate({ category: req.body.category }, req.body, { new: true });
            return res.status(201).json({ page });

        } else {
            const newPage = new Page(req.body);
            await newPage.save();
            return res.status(201).json({ page: newPage });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


const getPage = async (req, res) => {
    try {
        const { category, type } = req.params;
        if (type === "page") {
            const page = await Page.findOne({ category }).exec();
            console.log("page received:", page);

            if (!page) {
                return res.status(404).json({ error: "Page not found" });
            }

            return res.status(200).json({ page });
        } else {
            return res.status(400).json({ error: "Invalid request type" });
        }
    } catch (error) {
        console.error("Error in getPage:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { createPage, getPage };

