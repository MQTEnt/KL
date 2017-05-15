<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class IndexFormRequest extends Request
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
            'name' => 'required|min:2|unique:indexes,name,'.$id,
            'unit' => 'required|max:10',
            'description' => 'required|min:10'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Không được bỏ trống',
            'name.min' => 'Nội dung cần ít nhất 2 kí tự',
            'name.unique' => 'Tên đã được sử dụng, mời chọn tên khác',
            'unit.required' => 'Không được bỏ trống',
            'unit.max' => 'Nội dung không được quá 10 kí tự',
            'description.required' => 'Không được bỏ trống',
            'description.min' => 'Nội dung cần ít nhất 10 kí tự'
        ];
    }
}
