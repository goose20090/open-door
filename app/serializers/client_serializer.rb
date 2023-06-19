class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_type

  has_many :appointments

  def user_type
    'Client'
  end
end
