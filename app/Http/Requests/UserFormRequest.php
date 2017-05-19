<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class UserFormRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->id;
        return [
            'name' => 'required|min:3',
            'address' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            'dob' => 'required|date',
            'phone' => 'required|numeric',
            'password' => 'required|min:6'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Không được bỏ trống họ và tên',
            'name.min' => 'Họ và tên cần có ít nhất 3 kí tự',
            'address.required' => 'Không được bỏ trống địa chỉ',
            'email.required' => 'Không được bỏ trống Email',
            'email.email' => 'Không đúng định dạng Email',
            'email.unique' => 'Email đã được sử dụng, hãy điền Email khác',
            'dob.required' => 'Không được bỏ trống ngày sinh',
            'dob.date' => 'Ngày sinh không đúng định dạng',
            'phone.required' => 'Không được bỏ trống số điện thoại',
            'phone.numeric' => 'Số điện thoại không đúng định dạng',
            'password.required' => 'Không được để trống mật khẩu',
            'password.min' => 'Mật khẩu phải ít nhất 6 kí tự'
        ];
    }
}
