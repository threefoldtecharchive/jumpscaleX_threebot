# Slideshow macro version 2
you can use this macro to include slides from different presentations into your docsite

### Example

```
!!!slideshow_v2
[[presentation]]
presentaion_1 = "presentation_guid"
presentaion_2 = "presentation_guid"

[[slideshow]]
presentation =  "presentation_1"
slide = "required slide numbers"

[[slideshow]]
presentation =  "presentation_2"
slide = "required slide numbers"
```

**Required slide numbers** can be:

* separated slides : **"1,2,3,4"** slide number_1,number_2,number_3,number_4
* ranges :
    * **"1:5"** all slides starting from slide number_1 to slide number_5.
    * **":5"** all slides starting from first slide to slide number_5.
    * **"5:"** all slides starting from slide number_5 tell the last slide in the presentation.
    * **":"** all slides starting from the first slide to the last slide in the presentation.
 * mix all of that:
    * **"1,2,3,6:8"** slide number_1,slide number_2,slide number_3 and all the slides from slide number_6 to slide number_8
    * **"1,2,6:"** slide number_1,slide number_2 and all the slides starting from slide number_6 till the end of the presentation.
    
    **This macros depends on :**
    * Serializing a valid toml to dictionary  
    * Slice the ```required slide numbers``` to identify the required slides and the ranges
    * Using Gdrive to downloaded the slides. [more information ](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/docs/wikis/tech/README.md#setting-up-gdrive-and-service-account)
    * Map the downloaded slides to the required slides
    * ****
