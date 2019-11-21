# Slideshow macro
you can use this macro to include slides from different presentations into your docsite

### Example

```
!!!slideshow
presentation_1 = {presentation_guid}
presentation_2 = {presentation_guid}

slide_1 = presentation_1[{slide_name_or_guid}]
slide_2 = presentation_2[{slide_name_or_guid}]
```

Note: You can use "one slide fragment" unlimited times but if u want to use "multiple slides fragment" you are only allowed to use one time per page.
