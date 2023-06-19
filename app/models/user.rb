class User < ApplicationRecord
  has_secure_password

    belongs_to :userable, polymorphic: true
end
