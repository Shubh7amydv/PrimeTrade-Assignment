class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async destroy(modelId) {
    try {
      const result = await this.model.findByIdAndDelete(modelId);
      return !!result;
    } catch (error) {
      throw error;
    }
  }

  async get(modelId) {
    try {
      const result = await this.model.findById(modelId);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll(filter = {}) {
    try {
      const result = await this.model.find(filter);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(modelId, data) {
    try {
      const result = await this.model.findByIdAndUpdate(modelId, data, {
        new: true,
        runValidators: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(filter) {
    try {
      const result = await this.model.findOne(filter);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CrudRepository;
