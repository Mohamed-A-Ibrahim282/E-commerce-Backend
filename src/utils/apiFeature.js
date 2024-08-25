export class ApiFeature {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }

  pagination() {
    //=================== 1- pagination ===============
    let pageNumber = this.searchQuery.page * 1 || 1;
    if (pageNumber < 1) pageNumber = 1;
    let limit = 2;
    let skip = (pageNumber - 1) * limit;
    this.pageNumber = pageNumber;
    this.limit = limit;
    this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  filter() {
    //=================== 2- filter ===============
    let filterObj = structuredClone(this.searchQuery); //deep copy
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/gt|gte|lt|lte/g, (value) => `$${value}`);
    filterObj = JSON.parse(filterObj);

    let excludedFields = ["page", "search", "sort", "fields"];
    excludedFields.forEach((value) => {
      delete filterObj[value];
    });
    this.mongooseQuery.find(filterObj);
    return this;
  }

  //=================== 3- sort ===============

  sort() {
    if (this.searchQuery.sort) {
      let sortedBy = this.searchQuery.sort.split(",").join(" ");

      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }

  fields() {
    //=================== 4- selected Fields ===============

    if (this.searchQuery.fields) {
      let selectedFieldsed = this.searchQuery.fields.split(",").join(" ");
      this.mongooseQuery.select(selectedFieldsed);
    }
    return this;
  }

  search() {
    //=================== 5- Search ===============

    if (this.searchQuery.search) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.searchQuery.search, $option: "i" } },
          { description: { $regex: this.searchQuery.search, $option: "i" } },
        ],
      });
    }
    return this;
  }
}
