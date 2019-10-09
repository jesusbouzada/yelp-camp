var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {
        name: "Hoh Campground", 
        image: "https://img.hipcamp.com/images/c_limit,f_auto,h_1200,q_60,w_1920/v1502810519/campground-photos/dfl4qsaqejudqg0h9z84/olympic-national-park-hoh-campground.jpg",
        description: "Hoh Campground in Olympic National Park has 88 campsites and is located in an old growth temperate rainforest along the Hoh River. Campers should expect a wet and damp camping experience (the area gets an average of 145 inches of rain annually). The campground is first-come, first-serve and can accommodate tents, trailers, and RVs (up to 21 feet). Each campsite also has a table, fire ring and grill.  Amenities include drinking water, a comfort station, and restrooms with flush toilets. There is no dump station."
    },
    {
        name: "Madison Campground", 
        image: "https://www.nps.gov/common/uploads/structured_data/3C847178-1DD8-B71B-0BF799119633FE17.jpg?width=800&height=800&mode=crop&quality=90",
        description: "Madison Campground in Yellowstone National Park has 292 single-family campsites and is located near the Madison River in a lush mountain setting. It is about 14 miles east of the West Yellowstone entrance. The campground is popular due to its central location and proximity to the Madison River, Gibbon and Firehole Rivers. Campsites can accommodate tents, trailers and RVs. Each campsite also has a table, and fire ring/grill. Shared food storage lockers are also available in the campground.  Campground amenities include drinking water, flush toilets and a dump station."
    },
    {
        name: "North Pines", 
        image: "https://www.yosemite.com/wp-content/uploads/2016/04/Matt-Vowinkel.jpg",
        description: "North Pines Campground in Yosemite National Park is located on the banks of the Merced River and has 81 single-family campsites for tents, trailers and RVs (up to 30 feet long). This is one of three campgrounds in Yosemite Valley. The other two are  Upper Pines and Lower Pines. A couple of prime campsites are river front. The campground has paved roads and parking pads, drinking water, flush toilets and an RV dump station. Each campsite has a table, fire ring, grate and food storage locker."
    },
    {
        name: "Savage River", 
        image: "https://media-cdn.tripadvisor.com/media/photo-s/08/37/7b/dc/savage-river.jpg",
        description: "Savage River campground is located at Mile 13 on the Denali Park Road. It sits in a spruce forest, with moderate screening between sites. On clear days, Denali can be seen from a short walk below the campground."
    }
];

function seedDB(){
    Campground.remove({}, (err) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Campgrounds removed!")

        // data.forEach((seed) => {
        //     Campground.create(seed, (err, campground) => {
        //         if(err) {
        //             console.log(err);
        //             return;
        //         }
        //         console.log("Campground added!");
        //         Comment.create( 
        //             { 
        //                 text: "This place is great, but I wish there was Internet", 
        //                 author: "Homer"
        //             },
        //             (err, comment) => {
        //                 if(err) {
        //                     console.log(err);
        //                     return;
        //                 }
        //                 campground.comments.push(comment);
        //                 campground.save();
        //                 console.log("Created new comment");
        //             }
        //         )
        //     });
        // });
    });
}

module.exports = seedDB;
