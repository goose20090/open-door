class TherapistSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_one :availability
end
