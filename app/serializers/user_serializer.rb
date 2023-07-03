class UserSerializer < ActiveModel::Serializer
  attributes :id, :userable

  def userable
    ActiveModel::SerializableResource.new(object.userable)
  end
end