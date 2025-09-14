import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model,
  UUIDV4,
} from "sequelize";

import { sequelizeInstance } from "../../config/sequelize";

export class UserAuth extends Model<
  InferAttributes<UserAuth>,
  InferCreationAttributes<UserAuth>
> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare otp: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: CreationOptional<Date>;
}

UserAuth.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: "users",
  }
);
