/**
 *
 * @author shiloh
 * @date 2025/4/23 17:31
 */
export const JSON_OBJECT_TEST_STR = `
{
  "id": 1,
  "username": "shiloh",
  "gender": 1,
  "birthday": "1998-03-02",
  "createTime": "2025-02-27 10:00:05",
  "email": null,
  "pi": 3.1415926,
  "address": {
    "id": 1,
    "country": "China",
    "province": "Guangdong",
    "city": "FoShan",
    "street": "桂城街道"
  },
  "doubleNumArr": [1.52, 2.53, 3.53, 4.54, 5.55],
  "intArr": [1, 2, 3, 4, 5],
  "strArr": ["a", "b", "c", "d", "e"],
  "roles": [
    {
      "id": 1,
      "roleName": "admin",
      "permissions": [
        {
          "id": 1,
          "code": "sys:user:view",
          "description": "查看用户列表",
          "url": "/api/users"
        },
        {
          "id": 2,
          "code": "sys:user:create",
          "description": "创建用户",
          "url": "/api/users/save"
        }
      ]
    },
    {
      "id": 2,
      "roleName": "user",
      "permissions": [
        {
          "id": 1,
          "code": "sys:user:view",
          "description": "查看用户列表",
          "url": "/api/users"
        },
        {
          "id": 2,
          "code": "sys:user:create",
          "description": "创建用户",
          "url": "/api/users/save"
        }
      ]
    }
  ],
  "enabled": true
}
`.trim()
